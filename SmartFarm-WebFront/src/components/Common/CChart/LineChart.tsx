import ApexCharts from "react-apexcharts";

type Props = {
  categories: string[];
  data: { name: string; data: number[] }[];
};

const LineChart = ({ categories, data }: Props) => {
  const options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#005e63", "#2E6CA3"], // theme.colors.primary
    xaxis: {
      categories: categories,
    },
  };

  return <ApexCharts type="line" series={data} options={options} />;
};

export default LineChart;
