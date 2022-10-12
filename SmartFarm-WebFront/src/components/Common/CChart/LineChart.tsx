import { ChartDataTypes } from '@typedef/components/Common/chart.data.types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
type Props = {
  data: ChartDataTypes;
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const LineChart = ({ data }: Props) => {
  return (
    <Line
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      }}
      data={data}
    />
  );
};

export default LineChart;
