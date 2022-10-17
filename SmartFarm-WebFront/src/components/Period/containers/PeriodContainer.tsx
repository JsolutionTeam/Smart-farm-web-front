import Period from '../Period';
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

const PeriodContainer = () => {
  const { getToken } = useToken();
  const { getUser } = useUser();
  const siteSeq = useMemo(() => getUser().siteSeq, [getUser]);
  const [selectedDate, setSelectedDate] = useState<{ start: Date; end: Date }>({
    start: getPrevMonth(),
    end: setEndDate(),
  });
  const [selectedContent, setSelectedContent] = useState<ContentTypes>(
    contents[0],
  );
  const [allData, setAllData] = useState<PeriodTypes[]>([]);
  const [filteredData, setFilteredData] = useState<PeriodTypes[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const chartData: ChartDataTypes = useMemo(
    () => ({
      labels: chartLabels.map((label) => dayjs(label).format('DD일 HH시')),
      datasets: [
        {
          label: '기간',
          data: filteredData.map((data) =>
            Math.round(data[selectedContent.value]),
          ),
          borderColor: '#058b6b',
          backgroundColor: '#058b6b',
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
  const onChangeDate = (name: 'start' | 'end', date: Date) => {
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
      [name]: temp,
    }));
  };

  // 차트 데이터 변경
  const setChartData = useCallback(() => {
    const { start, end } = selectedDate;

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

    let temp = [];

    // 데이터의 시간과 라벨의 시간이 같은 데이터 필터링
    // 존재하지 않는 경우 데이터 0으로 초기화
    for (let i = 0; i < labels.length; i++) {
      const filtered = allData.filter(
        (period) => period.microRegTime.slice(0, -3) === labels[i],
      );
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
    setFilteredData(temp);
  }, [selectedDate, allData]);

  // 데이터 조회
  const getData = useCallback(async () => {
    function formatDate(date: Date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    }

    const { config, data } = await requestSecureGet<PeriodTypes[]>(
      apiRoute.site +
        `${siteSeq}/summary?startTime=${formatDate(
          selectedDate.start,
        )}&endTime=${formatDate(selectedDate.end)}`,
      {},
      getToken()!,
    );

    if (config.status >= 200 && config.status < 400) {
      setAllData(data);
    }
  }, [getToken, selectedDate, siteSeq]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    setChartData();
  }, [setChartData]);

  return (
    <Period
      selectedContent={selectedContent}
      onChangeContent={onChangeContent}
      selectedDate={selectedDate}
      onChangeDate={onChangeDate}
      chartData={chartData}
    />
  );
};

export default PeriodContainer;
