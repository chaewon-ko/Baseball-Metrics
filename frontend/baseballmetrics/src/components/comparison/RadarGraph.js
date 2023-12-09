import React, { useEffect, useRef } from 'react';
import { Radar } from 'react-chartjs-2';
import { themes } from '../../themes';

const RadarGraph = ({ type, label1 = '선수 1', label2 = '선수 2', player1, player2, theme }) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = document.getElementById('radarChart');
		const context = canvas.getContext('2d');
		context.clearRect(0,0,canvas.width, canvas.height);
	}, []);

  const radarLabels = type === 'batter' ?
    ['power', 'contact', 'batting eye', 'mental', 'speed', 'defence'] :
    ['movement', 'ball speed', 'health', 'mental', 'command'];  // 예시, 투수일 때 사용할 라벨 목록


  const data = {
    labels: radarLabels,
    datasets: [
      {
        label: label1,
        backgroundColor: themes[theme].mainTransparent,
        borderColor: themes[theme].mainColor,
        pointBackgroundColor: themes[theme].mainColor,
        pointBorderColor: '#fff',
        pointHoverBorderColor: themes[theme].mainColor,
        data: player1,
      },
      {
        label: label2,
        backgroundColor: themes[theme].subTransparent,
        borderColor: themes[theme].subColor,
        pointBackgroundColor: themes[theme].subColor,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: themes[theme].subColor,
        data: player2,
      },
    ],
  };

  const options = {
    scales: {
			r: {
				ticks: {
					stepSize: 20,
					maxTicksLimit: 100
				},
				beginAtZero: true,
				grid: {
					color: 'rgba(0,128,0,0.3)'
				}
			}
    },
  };

  const chartKey = `radarChart_${player1.join('_')}_${player2.join('_')}`;

  return (
    <div>
			<canvas id='radarChart' ref={canvasRef} />
      <Radar key={chartKey} data={data} options={options} />
    </div>
  );
};

export default RadarGraph;
