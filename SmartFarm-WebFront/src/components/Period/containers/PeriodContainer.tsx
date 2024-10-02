import Period from "../Period";
import { useState, useEffect, useMemo } from "react";
import useLocalStorage from "@hooks/useLocalStorage";
import useSite from "@hooks/store/useSite";
import { requestSecureGet } from "@lib/api";
import { setStartDate, setEndDate, getPrevMonth } from "@lib/date";
import dayjs from "dayjs";
import { contents } from "@components/Common/Select/ContentSelect";
import { ContentTypes } from "@components/Common/Select/containers/ContentSelectContainer";
import { SummaryTypes } from "@components/RealTime/containers/RealTimeContainer";

const PeriodContainer = () => {
  const { getToken, getUser } = useLocalStorage();
  const { selectedSite } = useSite();
  const [selectedContent, setSelectedContent] = useState<ContentTypes>(
    contents[0]
  );
  const [selectedDate, setSelectedDate] = useState<{ start: Date; end: Date }>({
    start: getPrevMonth(),
    end: setEndDate(),
  });
  // 전체 데이터
  const [allData, setAllData] = useState<SummaryTypes[]>([]);
  // 전체 데이터에서 XAxis에 해당하는 데이터만 필터링한 데이터
  const [filteredData, setFilteredData] = useState<SummaryTypes[]>([]);
  const [chartXAxis, setChartXAxis] = useState<string[]>([]);
  const chartData = useMemo(
    () =>
      filteredData.map((data) =>
        Math.round(data[selectedContent.value] as number)
      ),
    [filteredData, selectedContent.value]
  );
  const siteSeq = useMemo(
    () => (selectedSite ? selectedSite.id : getUser().siteSeq),
    [getUser, selectedSite]
  );

  // 컨텐츠 선택
  const onChangeContent = (content: ContentTypes) => {
    setSelectedContent(content);
  };

  // 시작일, 종료일 선택
  const onChangeDate = (name: "start" | "end", date: Date) => {
    let temp = new Date();

    if (name === "start") {
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

  // 차트 X축, 데이터 가공
  const processedData = () => {
    const { start, end } = selectedDate;

    // 선택한 일 수 (종료일 - 시작일)
    // 선택한 일 수에 따라 X축이 결정됨
    const diffDate = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    // X축
    const xAxis: string[] = [];

    // X축 설정
    // hour : 몇 시간 단위인지, repeat : 몇 번 반복인지
    const createXAxis = (hour: number, repeat: number) => {
      for (let i = 0; i < repeat; i++) {
        const date = new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          hour * i,
          0,
          0
        );
        xAxis.push(dayjs(date).format("YYYY-MM-DD HH:mm"));
      }

      return xAxis;
    };

    if (diffDate === 1)
      // 하루 : 4시간 단위 (0, 4, 8, 12, 16, 20, 24시)
      createXAxis(4, 7);
    else if (diffDate === 2)
      // 이틀 : 8시간 단위 (0, 8, 16, 24, 8, 16, 24)
      createXAxis(8, 7);
    else if (diffDate === 3)
      // 사흘 : 8시간 단위 (0, 8, 16, 24, 8, 16, 24, 8, 16, 24)
      createXAxis(8, 10);
    else if (diffDate > 3) {
      // 사흘 초과 : 하루 단위
      for (let i = 0; i < diffDate; i++) {
        let date = new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate() + i,
          12,
          0,
          0
        );
        xAxis.push(dayjs(date).format("YYYY-MM-DD HH:mm"));
      }
    }

    const data: SummaryTypes[] = xAxis.map((x) => {
      const found = allData.find((data) =>
        data.microRegTime !== null ? data.microRegTime.slice(0, -3) === x : ""
      );

      if (found) {
        return found;
      } else {
        return {
          co2: 0,
          co2RegTime: "",
          earthTemperature: 0,
          earthHumidity: 0,
          microRegTime: "",
          rainfall: 0,
          relativeHumidity: 0,
          siteSeq: 0,
          solarRadiation: 0,
          temperature: 0,
          windDirection: 0,
          windSpeed: 0,
          cropTemperature: 0,
          cropHumidity: 0,
        };
      }
    });

    setChartXAxis(xAxis);
    setFilteredData(data);
  };

  // 차트 데이터 가공 함수 호출
  // 데이터 새로 GET 하거나, 컨텐츠 바뀌면 실행됨
  useEffect(() => {
    processedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData, selectedContent]);

  // 데이터 GET
  // 농가, 일자 바뀌면 실행됨
  useEffect(() => {
    const formatDate = () => {
      const { start, end } = selectedDate;

      const formatDate = (date: Date) => {
        return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      };

      return `startTime=${formatDate(start)}&endTime=${formatDate(end)}`;
    };

    const getData = async () => {
      const { config, data } = await requestSecureGet<SummaryTypes[]>(
        `/v1/sites/${siteSeq}/summary?${formatDate()}`,
        {},
        getToken()!
      );

      if (config.status >= 200 && config.status < 400) {
        setAllData(data);
      }
    };

    getData();
  }, [getToken, selectedDate, siteSeq]);

  return (
    <Period
      selectedContent={selectedContent}
      onChangeContent={onChangeContent}
      selectedDate={selectedDate}
      onChangeDate={onChangeDate}
      chartXAxis={chartXAxis}
      chartData={chartData}
    />
  );
};

export default PeriodContainer;
