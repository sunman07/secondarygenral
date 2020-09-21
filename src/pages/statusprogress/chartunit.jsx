import React, { useRef, useEffect, useState, Fragment } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
const ChartPartUnit = props => {
  const { entryForCharts } = props;
  const mainChartRef = useRef(null);
  const [nameOfEntry, setNameOfEntry] = useState([]);
  const [pointOfEntry, setPointOfEntry] = useState([]);
  let myChart = {};
  //待dom加载完成后执行
  setTimeout(() => {
    myChart = echarts.init(mainChartRef.current);
    setChart();
    //自适应
    window.addEventListener('resize', function() {
      myChart.resize();
    });
  }, 0);

  //处理父组件传来的图表数据
  const handleChartInside = () => {
    let name = [];
    let point = [];
    console.log(entryForCharts, '数组');
    if (entryForCharts[0]) {
      entryForCharts.forEach(item => {
        const underline = item.ModuleName.length > 8 ? '...' : '';
        name.push(item.ModuleName.substring(0, 6) + underline);
        point.push(item.Average);
      });
      console.log(name, point, '结果！！！');
      setNameOfEntry(name);
      setPointOfEntry(point);
    }
  };

  useEffect(() => {
    handleChartInside();
  }, [entryForCharts]);
  const setChart = () => {
    // 绘制图表
    myChart.setOption({
      title: { text: 'ECharts Grids' },
      color: '#1890ff',
      tooltip: {},
      //柱体宽度
      barWidth: 100,
      xAxis: {
        data: [...nameOfEntry],
        //x轴颜色
        axisLine: {
          lineStyle: {
            color: '#1890ff',
          },
        },
      },
      yAxis: {
        //y轴颜色
        axisLine: {
          lineStyle: {
            color: '#1890ff',
          },
        },
      },
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [...pointOfEntry],
        },
      ],
    });
  };

  return (
    <div
      ref={mainChartRef}
      style={{ width: '100%', height: 500, background: '#fff' }}
    >
      Charts
    </div>
  );
};

export default ChartPartUnit;
