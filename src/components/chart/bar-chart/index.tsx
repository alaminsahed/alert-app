import ReactEcharts from 'echarts-for-react';
import { FC } from 'react';

interface BarChartProps {
  data: any;
}

const BarChart: FC<BarChartProps> = ({ data }) => {
  const dataLength = data?.series[0]?.data?.length;
  console.log({ dataLength });
  const modifiedData = {
    ...data,
    toolbox: false,
    grid: {
      show: false,
    },
    yAxis: {
      show: false,
    },
    xAxis: {
      ...data.xAxis,
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        interval: dataLength < 8 ? 0 : null,
        fontSize: 10,
        formatter: (value: string) => {
          const parts = value.split('-');
          const day = parts[0];
          const month = parts[1];
          return `${day}-${month}`;
        },

        // margin: 20,
      },
    },
    series: data.series.map((series: any) => ({
      ...series,
      type: 'bar',
      itemStyle: {
        borderRadius: [10, 10, 0, 0],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#295CAB',
            },
            {
              offset: 1,
              color: '#295CAB99',
            },
          ],
          global: false,
        },
      },
      barWidth: 6,
    })),
  };

  return (
    <ReactEcharts
      option={modifiedData}
      style={{ height: '16rem', width: '100%' }}
    />
  );
};

export { BarChart };
