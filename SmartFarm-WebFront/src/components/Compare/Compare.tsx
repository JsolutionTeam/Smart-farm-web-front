import * as S from "@styles/components/ChartViewStyle";
import LineChart from "@components/Common/CChart/LineChart";
import { ChartDataTypes } from "@typedef/components/Common/chart.data.types";
import { ContentTypes } from "@typedef/assets/content.types";
import CSelectContainer from "@components/Common/CSelect/containers/CSelectContainer";
import CDatePicker from "@components/Common/CDatePicker/CDatePicker";

type Props = {
  selectedContent: ContentTypes;
  onChangeContent: (content: ContentTypes) => void;
  selectedDate: {
    first: {
      start: Date;
      end: Date;
    };
    second: {
      start: Date | null;
      end: Date | null;
    };
  };
  onChangeDate: (
    name: "start" | "end",
    date: Date,
    seq?: "first" | "second"
  ) => void;
  chartData: ChartDataTypes;
};

const Compare = ({
  selectedContent,
  onChangeContent,
  selectedDate,
  onChangeDate,
  chartData,
}: Props) => {
  return (
    <S.Main>
      <CSelectContainer selected={selectedContent} func={onChangeContent} />
      <S.Contents>
        <header>
          <CDatePicker
            selectedDate={selectedDate.first}
            func={onChangeDate}
            seq="first"
          />
          <div className="hyphen">-</div>
          <CDatePicker
            selectedDate={selectedDate.second}
            func={onChangeDate}
            seq="second"
          />
        </header>
        <h3>{selectedContent.name}</h3>
        <S.ChartBox>
          <LineChart data={chartData} />
        </S.ChartBox>
      </S.Contents>
    </S.Main>
  );
};

export default Compare;
