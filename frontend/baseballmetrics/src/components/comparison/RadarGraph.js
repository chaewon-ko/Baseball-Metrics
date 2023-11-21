import React, { useEffect, useRef } from 'react';
import { Radar } from 'react-chartjs-2';

const RadarGraph = ({ player1, player2 }) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = document.getElementById('radarChart');
		const context = canvas.getContext('2d');
		context.clearRect(0,0,canvas.width, canvas.height);
	}, []);

  const data = {
    labels: ['power', 'contact', 'batting eye', 'mental', 'speed', 'defence'],
    datasets: [
      {
        label: '선수1',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: player1,
      },
      {
        label: '선수2',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
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
