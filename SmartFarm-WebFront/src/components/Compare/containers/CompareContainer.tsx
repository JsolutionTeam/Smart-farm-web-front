import Compare from '../Compare';
import { useState, useEffect, useCallback, useMemo } from 'react';
import useToken from '@hooks/useToken';
import useUser from '@hooks/useUser';
import { apiRoute, requestSecureGet } from '@lib/api';
import { setStartDate, setEndDate, getPrevMonth } from '@lib/date';
import { ChartDataTypes } from '@typedef/components/Common/chart.data.types';
import { ContentTypes } from '@typedef/assets/content.types';
import { contents } from '@assets/content';
import { PeriodTypes } from '@typedef/components/Period/period.types';
import dayjs from 'dayjs';

const CompareContainer = () => {
  const { getToken } = useToken();
  const { getUser } = useUser();
  const siteSeq = useMemo(() => getUser().siteSeq, [getUser]);
  const [selectedDate, setSelectedDate] = useState({
    first: {
      start: getPrevMonth(),
      end: setEndDate(),
    },
    second: {
      start: setStartDate(),
      end: setEndDate(),
    },
  });
  const [selectedContent, setSelectedContent] = useState<ContentTypes>(
    contents[0],
  );
  const [allData, setAllData] = useState<{
    first: PeriodTypes[];
    second: PeriodTypes[];
  }>({
    first: [],
    second: [],
  });
  const [filteredData, setFilteredData] = useState<{
    first: PeriodTypes[];
    second: PeriodTypes[];
  }>({
    first: [],
    second: [],
  });
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const chartData: ChartDataTypes = useMemo(
    () => ({
      labels: chartLabels.map((label) => dayjs(label).format('MM월 DD일')),
      datasets: [
        {
          label: '비교1',
          data: filteredData.first.map((data) =>
            Math.round(data[selectedContent.value]),
          ),
          borderColor: '#058b6b',
          backgroundColor: '#058b6b',
        },
        {
          label: '비교2',
          data: filteredData.second.map((data) =>
            Math.round(data[selectedContent.value]),
          ),
          borderColor: '#ffa20d',
          backgroundColor: '#ffa20d',
        },
      ],
    }),
    [filteredData, chartLabels, selectedContent.value],
  );

  // 콘텐츠 선택
  const onChangeContent = (content: ContentTypes) => {
    setSelectedContent(content);
  };

  // 시작일, 종료일 선택
  const onChangeDate = (
    name: 'start' | 'end',
    date: Date,
    seq?: 'first' | 'second',
  ) => {
    let temp = new Date();

    if (name === 'start') {
      // 시간 00:00:00 설정
      temp = setStartDate(date);
    } else {
      // 시간 23:59:59 설정
      temp = setEndDate(date);
    }
    setSelectedDate((selectedDate) => ({
      ...selectedDate,
      [seq!]: temp,
    }));
  };

  // 차트 데이터 변경
  const setFirstChartData = useCallback(
    (seq: 'first' | 'second') => {
      console.log(`${seq} setChartData 실행`);
      const { start, end } =
        seq === 'first' ? selectedDate.first : selectedDate.second;

      // 선택한 일 수 (종료일 - 시작일)
      const diffDate = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
      );

      let labels: string[] = [];

      // labels setter
      // hour: 몇 시간 단위인지, repeat: 몇 번 반복인지
      function setLabels(hour: number, repeat: number) {
        for (let i = 0; i < repeat; i++) {
          let date = new Date(
            start.getFullYear(),
            start.getMonth(),
            start.getDate(),
            hour * i,
            0,
            0,
          );
          labels.push(dayjs(date).format('YYYY-MM-DD HH:mm'));
        }
      }

      // 하루: 4시간 단위 (0, 4, 8, 12, 16, 20, 24시)
      if (diffDate === 1) {
        setLabels(4, 7);
      }

      // 이틀: 8시간 단위 (0, 8, 16, 24, 8, 16, 24)
      if (diffDate === 2) {
        setLabels(8, 7);
      }

      // 사흘: 8시간 단위 (0, 8, 16, 24, 8, 16, 24, 8, 16, 24)
      if (diffDate === 3) {
        setLabels(8, 10);
      }

      // 사흘 이상: 하루 단위
      if (diffDate > 3) {
        for (let i = 0; i < diffDate; i++) {
          let date = new Date(
            start.getFullYear(),
            start.getMonth(),
            start.getDate() + i,
            12,
            0,
            0,
          );
          labels.push(dayjs(date).format('YYYY-MM-DD HH:mm'));
        }
      }

      let temp: PeriodTypes[] = [];

      // 데이터의 시간과 라벨의 시간이 같은 데이터 필터링
      // 존재하지 않는 경우 데이터 0으로 초기화
      for (let i = 0; i < labels.length; i++) {
        let filtered: PeriodTypes[] = [];
        if (seq === 'first') {
          filtered = allData.first.filter(
            (data) => data.microRegTime.slice(0, -3) === labels[i],
          );
        } else {
          filtered = allData.second.filter(
            (data) => data.microRegTime.slice(0, -3) === labels[i],
          );
        }
        if (filtered.length) {
          temp.push(filtered[0]);
        } else {
          temp.push({
            co2: 0,
            co2RegTime: 0,
            earthTemperature: 0,
            microRegTime: '',
            rainfall: 0,
            relativeHumidity: 0,
            solarRadiation: 0,
            temperature: 0,
            windDirection: 0,
            windSpeed: 0,
          });
        }
      }

      setChartLabels(labels);
      setFilteredData((filteredData) => ({
        ...filteredData,
        [seq]: temp,
      }));
    },
    [allData, selectedDate],
  );

  // 데이터 조회
  const getData = useCallback(
    async (seq: 'first' | 'second') => {
      const { start, end } =
        seq === 'first' ? selectedDate.first : selectedDate.second;

      function formatDate(date: Date) {
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
      }

      const { config, data } = await requestSecureGet<PeriodTypes[]>(
        apiRoute.site +
          `${siteSeq}/summary?startTime=${formatDate(
            start,
          )}&endTime=${formatDate(end)}`,
        {},
        getToken()!,
      );

      if (config.status >= 200 && config.status < 400) {
        setAllData((prev) => ({
          ...prev,
          [seq]: data,
        }));
      }
      setFirstChartData(seq);
    },
    [
      getToken,
      selectedDate.first,
      selectedDate.second,
      setFirstChartData,
      siteSeq,
    ],
  );

  useEffect(() => {
    getData('first');
    getData('second');
  }, [getData]);

  return (
    <Compare
      selectedContent={selectedContent}
      onChangeContent={onChangeContent}
      selectedDate={selectedDate}
      onChangeDate={onChangeDate}
      chartData={chartData}
    />
  );
};

export default CompareContainer;
