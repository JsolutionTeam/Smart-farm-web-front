import Compare from "../Compare";
import { useState, useEffect, useCallback, useMemo } from "react";
import { requestSecureGet } from "@lib/api";
import { setStartDate, setEndDate, getPrevMonth } from "@lib/date";
import { ChartDataTypes } from "@typedef/components/Common/chart.data.types";
import { PeriodTypes } from "@typedef/components/Period/period.types";
import dayjs from "dayjs";
import useLocalStorage from "@hooks/useLocalStorage";
import { contents } from "@components/Common/Select/ContentSelect";
import { ContentTypes } from "@components/Common/Select/containers/ContentSelectContainer";
import useSite from "@hooks/store/useSite";

const CompareContainer = () => {
  const { getToken, getUser } = useLocalStorage();
  const { selectedSite } = useSite();
  const siteSeq = useMemo(
    () => (selectedSite ? selectedSite.id : getUser().siteSeq),
    [getUser, selectedSite]
  );
  const [selectedDate, setSelectedDate] = useState<{
    first: { start: Date; end: Date };
    second: { start: Date | null; end: Date | null };
  }>({
    first: {
      start: getPrevMonth(),
      end: setEndDate(),
    },
    second: {
      start: null,
      end: null,
    },
  });

  const [selectedContent, setSelectedContent] = useState<ContentTypes>(
    contents[0]
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
  const selectedDateLength = useMemo(
    () =>
      Math.ceil(
        (selectedDate.first.end.getTime() -
          selectedDate.first.start.getTime()) /
          (1000 * 60 * 60 * 24)
      ),
    [selectedDate.first]
  );
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const chartData: ChartDataTypes = useMemo(
    () => ({
      labels: chartLabels.map((label, index) => `Day ${index + 1}`),
      datasets: [
        {
          label: "비교1",
          data: filteredData.first.map((data) =>
            Math.round(data[selectedContent.value])
          ),
          borderColor: "#058b6b",
          backgroundColor: "#058b6b",
        },
        {
          label: "비교2",
          data: filteredData.second.map((data) =>
            Math.round(data[selectedContent.value])
          ),
          borderColor: "#ffa20d",
          backgroundColor: "#ffa20d",
        },
      ],
    }),
    [filteredData, chartLabels, selectedContent.value]
  );
  const [isSecond, setIsSecond] = useState<number>(0);

  const temp = useMemo(
    () => ({
      categories: chartLabels.map((label, index) => `Day ${index + 1}`),
      data: {
        first: filteredData.first.map((data) =>
          Math.round(data[selectedContent.value])
        ),
        second: filteredData.second.map((data) =>
          Math.round(data[selectedContent.value])
        ),
      },
    }),
    [
      chartLabels,
      filteredData.first,
      filteredData.second,
      selectedContent.value,
    ]
  );

  // 콘텐츠 선택
  const onChangeContent = (content: ContentTypes) => {
    setSelectedContent(content);
  };

  // 시작일, 종료일 선택
  const onChangeDate = (
    name: "start" | "end",
    date: Date,
    seq?: "first" | "second"
  ) => {
    let temp = new Date();

    if (name === "start") {
      // 시간 00:00:00 설정
      temp = setStartDate(date);
    } else {
      // 시간 23:59:59 설정
      temp = setEndDate(date);
    }

    if (seq === "first") {
      setSelectedDate((selectedDate) => ({
        first: {
          ...selectedDate.first,
          [name]: temp,
        },
        second: {
          start: null,
          end: null,
        },
      }));
    }

    if (seq === "second") {
      if (name === "start") {
        setSelectedDate((selectedDate) => ({
          ...selectedDate,
          second: {
            start: temp,
            end: new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate() + selectedDateLength - 1,
              0,
              0,
              0
            ),
          },
        }));
      }
      if (name === "end") {
        setSelectedDate((selectedDate) => ({
          ...selectedDate,
          second: {
            start: new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate() - selectedDateLength,
              23,
              59,
              59
            ),
            end: temp,
          },
        }));
      }
      setIsSecond((prev) => prev + 1);
    }
  };

  // 차트 데이터 변경
  const setChartData = useCallback(() => {
    function setLabels(start: Date) {
      let labels = [];
      for (let i = 0; i < selectedDateLength; i++) {
        let date = new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate() + i,
          12,
          0,
          0
        );
        labels.push(dayjs(date).format("YYYY-MM-DD HH:mm"));
      }
      return labels;
    }

    // 데이터의 시간과 라벨의 시간이 같은 데이터 필터링
    // 존재하지 않는 경우 데이터 0으로 초기화
    function filteredData(data: PeriodTypes[], labels: string[]) {
      let temp: PeriodTypes[] = [];
      for (let i = 0; i < labels.length; i++) {
        const filtered = data.filter((period) =>
          period.microRegTime !== null
            ? period.microRegTime.slice(0, -3) === labels[i]
            : ""
        );
        if (filtered.length) {
          temp.push(filtered[0]);
        } else {
          temp.push({
            co2: 0,
            co2RegTime: 0,
            earthTemperature: 0,
            microRegTime: "",
            rainfall: 0,
            relativeHumidity: 0,
            solarRadiation: 0,
            temperature: 0,
            windDirection: 0,
            windSpeed: 0,
          });
        }
      }
      return temp;
    }

    const firstLabels = setLabels(selectedDate.first.start);
    const firstData = filteredData(allData.first, firstLabels);
    let secondData: PeriodTypes[] = [];

    if (selectedDate.second.start) {
      const secondLabels = setLabels(selectedDate.second.start);
      secondData = filteredData(allData.second, secondLabels);
    }

    setChartLabels(firstLabels);
    setFilteredData({
      first: firstData,
      second: secondData,
    });
  }, [allData, selectedDate, selectedDateLength]);

  // 데이터 조회
  const getData = useCallback(
    async (isSecond?: "isSecond") => {
      const { start, end } = isSecond
        ? selectedDate.second
        : selectedDate.first;

      if (start === null) return;

      function formatDate(date: Date) {
        return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      }

      const { config, data } = await requestSecureGet<PeriodTypes[]>(
        `/v1/site/${siteSeq}/summary?startTime=${formatDate(
          start!
        )}&endTime=${formatDate(end!)}`,
        {},
        getToken()!
      );

      if (config.status >= 200 && config.status < 400) {
        if (data.length === 1) {
          alert("해당 기간에 수집된 데이터가 없습니다.");
          return;
        }
        if (isSecond) {
          setAllData((allData) => ({
            ...allData,
            second: data,
          }));
        } else {
          setAllData((allData) => ({
            ...allData,
            first: data,
          }));
        }
      }
    },
    [getToken, selectedDate, siteSeq]
  );

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getData("isSecond");
  }, [getData, isSecond]);

  useEffect(() => {
    setChartData();
  }, [setChartData]);

  return (
    <Compare
      selectedContent={selectedContent}
      onChangeContent={onChangeContent}
      selectedDate={selectedDate}
      onChangeDate={onChangeDate}
      temp={temp}
    />
  );
};

export default CompareContainer;
