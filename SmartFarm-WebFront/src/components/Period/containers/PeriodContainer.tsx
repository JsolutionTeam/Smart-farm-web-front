import Period from '../Period';
import { useState, useEffect, useMemo, useCallback } from 'react';
import useToken from '@hooks/useToken';
import useUser from '@hooks/useUser';
import { apiRoute, requestSecureGet } from '@lib/api';
import { getStartDate, getEndDate, setStartDate, setEndDate } from '@lib/date';
import { ChartDataTypes } from '@typedef/components/Common/chart.data.types';
import { ContentTypes } from '@typedef/assets/content.types';
import { contents } from '@assets/content';
import { PeriodTypes } from '@typedef/components/Period/period.types';
import dayjs from 'dayjs';

const PeriodContainer = () => {
  const { getToken } = useToken();
  const { getUser } = useUser();
  const siteSeq = useMemo(() => getUser().siteSeq, [getUser]);
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: getStartDate(),
    end: getEndDate(),
  });
  const [selectedContent, setSelectedContent] = useState<ContentTypes>(
    contents[0],
  );
  const [periodData, setPeriodData] = useState<PeriodTypes[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<PeriodTypes[]>([]);
  const chartData: ChartDataTypes = useMemo(
    () => ({
      labels: labels.map((label) => dayjs(label).format('DD일 HH시')),
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
    [filteredData, labels, selectedContent.value],
  );
  const [reload, setReload] = useState<number>(0);

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

    setDateRange((dateRange) => ({
      ...dateRange,
      [name]: temp,
    }));

    // API 재호출
    setReload((reload) => reload + 1);
  };

  // 적용 버튼 선택 시 차트 데이터 변경
  const applyDate = useCallback(() => {
    const { start, end } = dateRange;

    // 선택한 일 수 (종료일 - 시작일)
    const diffDate = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );

    let labels: string[] = [];

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
        labels.push(dayjs(date).format('YYYY-MM-DD HH:mm'));
      }
    }
    if (diffDate === 2) {
      // 8시간 단위 (0, 8, 16, 24, 8, 16, 24)
      for (let i = 0; i < 7; i++) {
        let date = setLabel(8 * i);
        labels.push(dayjs(date).format('YYYY-MM-DD HH:mm'));
      }
    }
    if (diffDate === 3) {
      // 8시간 단위 (0, 8, 16, 24, 8, 16, 24, 8, 16, 24)
      for (let i = 0; i < 10; i++) {
        let date = setLabel(8 * i);
        labels.push(dayjs(date).format('YYYY-MM-DD HH:mm'));
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
        labels.push(dayjs(date).format('YYYY-MM-DD HH:mm'));
      }
    }

    let temp = [];
    for (let i = 0; i < labels.length; i++) {
      const filtered = periodData.filter(
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
    setLabels(labels);
    setFilteredData(temp);
  }, [dateRange, periodData]);

  const getPeriodData = useCallback(async () => {
    function formatDate(date: Date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    }

    const { config, data } = await requestSecureGet<PeriodTypes[]>(
      apiRoute.site +
        `${siteSeq}/summary?startTime=${formatDate(
          dateRange.start,
        )}&endTime=${formatDate(dateRange.end)}`,
      {},
      getToken()!,
    );

    if (config.status >= 200 && config.status < 400) {
      setPeriodData(data);
    }
  }, [siteSeq, getToken, dateRange]);

  useEffect(() => {
    getPeriodData();
  }, [getPeriodData, reload]);

  useEffect(() => {
    applyDate();
  }, [applyDate]);

  return (
    <Period
      selectedContent={selectedContent}
      onChangeContent={onChangeContent}
      dateRange={dateRange}
      onChangeDate={onChangeDate}
      chartData={chartData}
      applyDate={applyDate}
    />
  );
};

export default PeriodContainer;
