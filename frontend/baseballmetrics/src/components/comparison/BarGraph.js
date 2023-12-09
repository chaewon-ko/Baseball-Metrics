import React from 'react';
import { Bar } from 'react-chartjs-2';
import { themes } from '../../themes';

const BarGraph = ({type, label1='선수 1',label2='선수 2', player1, player2, theme}) => {
  const abilityLabelsBatter = ['득점', '안타', '2루타', '3루타', '홈런', '루타', '타점', '도루', '도루실패', '볼넷', '사구', '고의사구', '삼진', '병살', '희생타', '희생플라이', '타율', '출루율', '장타율', 'OPS', 'wOBA', 'wRC+', 'WAR2', 'WPA'];
  const abilityLabelsPitcher = ['승리', '패배', '세이브', '홀드', '이닝', '실점', '자책', '상대타자', '피안타', '피2루타', '피3루타', '피홈런', '볼넷', '고의4구', '사구', '탈삼진', '보크', '폭투', 'ERA', 'FIP', 'WHIP', 'ERA+', 'FIP+','WAR','WPA'];

  const abilityLabels = type === 'batter' ? abilityLabelsBatter : abilityLabelsPitcher;

  // ...
  const dataDiff = player1.map((ability, index) => ability - player2[index]);

  // 정규화를 위한 min, max 값 계산
  const min = Math.min(...dataDiff);
  const max = Math.max(...dataDiff);

  // 정규화
  const normalizedDataDiff = dataDiff.map(diff => (diff - min) / (max - min) * 2 - 1);

  const chartData = {
    labels: abilityLabels,
    datasets: [
      {
        data: normalizedDataDiff, // 정규화된 데이터 사용
        backgroundColor: normalizedDataDiff.map(diff => (diff > 0 ? themes[theme].subColor : themes[theme].mainColor)),
        borderColor: normalizedDataDiff.map(diff => (diff > 0 ? themes[theme].mainColor : themes[theme].subColor)),
        borderWidth: 1,
      },
    ],
  };
  // ...


  const chartOptions = {
    indexAxis: 'y',
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
    plugins: {
      legend: {
        display: false, 
      },
    },
    // 작동안하는것 같은디..
    tooltip: {
      enabled: false,
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarGraph;
