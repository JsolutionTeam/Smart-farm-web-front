type Data = {
  label: string;
  data: any[];
  borderColor?: string;
  backgroundColor: string;
};

export type ChartDataTypes = {
  labels: string[];
  datasets: Data[];
};
