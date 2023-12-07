import React from 'react';
import { Bar } from 'react-chartjs-2';
import { themes } from '../../themes';

const BarGraph = ({ player1, player2, theme}) => {
  const abilityLabels = ['Ability 1', 'Ability 2', 'Ability 3', 'Ability 4', 'Ability 5', 'Ability 6'];

  const dataDiff = player1.map((ability, index) => ability - player2[index]);

  const chartData = {
    labels: abilityLabels,
    datasets: [
      {
        data: dataDiff,
        backgroundColor: dataDiff.map(diff => (diff > 0 ? themes[theme].subColor : themes[theme].mainColor)),
        borderColor: dataDiff.map(diff => (diff > 0 ? themes[theme].mainColor : themes[theme].subColor)),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
    plugins: {
      legend: {
        display: false, // 범례 숨김
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarGraph;
