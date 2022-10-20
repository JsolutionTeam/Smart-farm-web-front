import * as S from "@styles/components/ChartViewStyle";
import ContentSelectContainer from "@components/Common/CSelect/containers/ContentSelectContainer";
import CDatePicker from "@components/Common/CDatePicker/CDatePicker";
import LineChart from "@components/Common/CChart/LineChart";
import { ChartDataTypes } from "@typedef/components/Common/chart.data.types";
import { ContentTypes } from "@typedef/assets/content.types";

type Props = {
  selectedContent: ContentTypes;
  onChangeContent: (content: ContentTypes) => void;
  selectedDate: {
    start: Date;
    end: Date;
  };
  onChangeDate: (name: "start" | "end", date: Date) => void;
  chartData: ChartDataTypes;
};

const Period = ({
  selectedContent,
  onChangeContent,
  selectedDate,
  onChangeDate,
  chartData,
}: Props) => {
  return (
    <S.Main>
      <ContentSelectContainer
        selected={selectedContent}
        func={onChangeContent}
      />
      <S.Contents>
        <header>
          <CDatePicker selectedDate={selectedDate} func={onChangeDate} />
        </header>
        <h3>{selectedContent.name}</h3>
        <S.ChartBox>
          <LineChart data={chartData} />
        </S.ChartBox>
      </S.Contents>
    </S.Main>
  );
};

export default Period;
