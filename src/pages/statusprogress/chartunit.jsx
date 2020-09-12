import React, { useRef, Fragment } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
const ChartPartUnit = () => {
  const mainChartRef = useRef(null);
  let myChart = {}
  //待dom加载完成后执行
  setTimeout(() => {
    myChart = echarts.init(mainChartRef.current);
    setChart();
    //自适应
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }, 0);

  const setChart = () => {
    // 绘制图表
    myChart.setOption({
      title: { text: 'ECharts Grids' },
      color: '#1890ff',
      tooltip: {},
      //柱体宽度
      barWidth: 100,
      xAxis: {
        data: ["思想政治素养", "创新创业模块", "文体活动模块", "社会实践模块"],
        //x轴颜色
        axisLine: {
          lineStyle: {
            color: "#1890ff",
          }
        },
      },
      yAxis: {
        //y轴颜色
        axisLine: {
          lineStyle: {
            color: "#1890ff",
          }
        }
      },
      series: [{
        name: '销量',
        type: 'bar',
        data: [0.6, 0.8, 0.2, 0.7]
      }]
    });
  };

  return (
    <div ref={mainChartRef} style={{ width: '100%', height: 500,background:'#fff' }}>
      Charts
    </div>
  );
};

export default ChartPartUnit;
