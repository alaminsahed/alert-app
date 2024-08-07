import ReactEcharts from 'echarts-for-react';
import { FC } from 'react';

interface PieChartProps {
  data: any;
}

const PieChart: FC<PieChartProps> = ({ data }) => {
  return <ReactEcharts option={data} style={{ height: '10rem' }} />;
};

export { PieChart };
