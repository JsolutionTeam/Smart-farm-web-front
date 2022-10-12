import * as S from '@styles/components/ChartViewStyle';
import LineChart from '@components/Common/CChart/LineChart';
import { ChartDataTypes } from '@typedef/components/Common/chart.data.types';
import { ContentTypes } from '@typedef/assets/content.types';
import CSelectContainer from '@components/Common/CSelect/containers/CSelectContainer';
import CDatePicker from '@components/Common/CDatePicker/CDatePicker';

type Props = {
  selectedContent: ContentTypes;
  onChangeContent: (content: ContentTypes) => void;
  selectedDate: {
    first: {
      start: Date;
      end: Date;
    };
    second: {
      start: Date;
      end: Date;
    };
  };
  onChangeDate: (name: 'start' | 'end', date: Date, seq?: 1 | 2) => void;
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
            seq={1}
            selectedDate={selectedDate.first}
            func={onChangeDate}
          />
          <div className='hyphen'>-</div>
          <CDatePicker
            seq={2}
            selectedDate={selectedDate.second}
            func={onChangeDate}
          />
        </header>
        <S.ChartBox>
          <h3>{selectedContent.name}</h3>
          <LineChart data={chartData} />
        </S.ChartBox>
      </S.Contents>
    </S.Main>
  );
};

export default Compare;
