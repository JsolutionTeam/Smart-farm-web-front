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
  const [selectedContent, setSelectedContent] = useState<ContentTypes>(
    contents[0],
  );
  const [selectedDate, setSelectedDate] = useState({
    first: {
      start: getPrevMonth(),
      end: setEndDate(),
    },
    second: {
      start: getPrevMonth(),
      end: setEndDate(),
    },
  });
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
  const [labels, setLabels] = useState<string[]>([]);
  const chartData: ChartDataTypes = useMemo(
    () => ({
      labels: labels.map((label) => dayjs(label).format('DD일 HH시')),
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
    [filteredData, labels, selectedContent.value],
  );

  const onChangeContent = (content: ContentTypes) => {
    setSelectedContent(content);
  };

  const setChartData = useCallback(
    (seq: 1 | 2) => {
      const { start, end } =
        seq === 1 ? selectedDate.first : selectedDate.second;
      const seqData = seq === 1 ? allData.first : allData.second;
      const hehe = seq === 1 ? 'first' : 'second';

      // 선택한 일 수 (종료일 - 시작일)
      const diffDate = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
      );

      let tempLabels: string[] = [];

      function setLabel(hour: number) {
        return new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          hour,
          0,
          0,
        );
      }

      if (diffDate === 1) {
        // 4시간 단위 (0, 4, 8, 12, 16, 20, 24시)
        for (let i = 0; i < 7; i++) {
          let date = setLabel(4 * i);
          tempLabels.push(dayjs(date).format('YYYY-MM-DD HH:mm'));
        }
      }
      if (diffDate === 2) {
        // 8시간 단위 (0, 8, 16, 24, 8, 16, 24)
        for (let i = 0; i < 7; i++) {
          let date = setLabel(8 * i);
          tempLabels.push(dayjs(date).format('YYYY-MM-DD HH:mm'));
        }
      }
      if (diffDate === 3) {
        // 8시간 단위 (0, 8, 16, 24, 8, 16, 24, 8, 16, 24)
        for (let i = 0; i < 10; i++) {
          let date = setLabel(8 * i);
          tempLabels.push(dayjs(date).format('YYYY-MM-DD HH:mm'));
        }
      }
      if (diffDate > 3) {
        // 하루 단위
        for (let i = 0; i < diffDate; i++) {
          let date = new Date(
            start.getFullYear(),
            start.getMonth(),
            start.getDate() + i,
            12,
            0,
            0,
          );
          tempLabels.push(dayjs(date).format('YYYY-MM-DD HH:mm'));
        }
      }

      let temp: PeriodTypes[] = [];
      for (let i = 0; i < tempLabels.length; i++) {
        const filtered = seqData.filter(
          (data) => data.microRegTime.slice(0, -3) === tempLabels[i],
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

      setLabels(labels);

      setFilteredData((filteredData) => ({
        ...filteredData,
        [hehe]: temp,
      }));
    },
    [
      allData.first,
      allData.second,
      labels,
      selectedDate.first,
      selectedDate.second,
    ],
  );

  // 시작일, 종료일 선택
  const onChangeDate = (name: 'start' | 'end', date: Date, seq?: 1 | 2) => {
    let temp = new Date();

    if (name === 'start') {
      // 시간 00:00:00 설정
      temp = setStartDate(date);
    } else {
      // 시간 23:59:59 설정
      temp = setEndDate(date);
    }

    if (seq === 1) {
      setSelectedDate((selectedDate) => ({
        ...selectedDate,
        first: {
          ...selectedDate.first,
          [name]: temp,
        },
      }));
    }

    if (seq === 2) {
      setSelectedDate((selectedDate) => ({
        ...selectedDate,
        second: {
          ...selectedDate.first,
          [name]: temp,
        },
      }));
    }

    setChartData(seq!);
  };

  const getFirstData = useCallback(async () => {
    console.log('getFirstData 실행');

    function formatDate(date: Date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    }

    const { config, data } = await requestSecureGet<PeriodTypes[]>(
      apiRoute.site +
        `${siteSeq}/summary?startTime=${formatDate(
          selectedDate.first.start,
        )}&endTime=${formatDate(selectedDate.first.end)}`,
      {},
      getToken()!,
    );

    if (config.status >= 200 && config.status < 400) {
      setAllData((prev) => ({
        ...prev,
        first: data,
      }));
    }
  }, [getToken, selectedDate.first, siteSeq]);

  const getSecondData = useCallback(async () => {
    console.log('getSecondData 실행');

    function formatDate(date: Date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    }

    const { config, data } = await requestSecureGet<PeriodTypes[]>(
      apiRoute.site +
        `${siteSeq}/summary?startTime=${formatDate(
          selectedDate.second.start,
        )}&endTime=${formatDate(selectedDate.second.end)}`,
      {},
      getToken()!,
    );

    if (config.status >= 200 && config.status < 400) {
      setAllData((prev) => ({
        ...prev,
        second: data,
      }));
    }
  }, [getToken, selectedDate.second, siteSeq]);

  useEffect(() => {
    getFirstData();
  }, [getFirstData]);

  useEffect(() => {
    getSecondData();
  }, [getSecondData]);

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
