import React, { useState } from 'react';
import RadarGraph from '../components/comparison/RadarGraph';
import styled from 'styled-components';
import BarGraph from '../components/comparison/BarGraph';

const GraphDiv = styled.div`
  margin: 0 auto;
  width: 600px;
`;

const GraphDiv3 = styled.div`
  margin: 0 auto;
  width: 30%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  grid-gap: 20px;
`;

const playerList = [
  { id: 1, name: '선수1', abilities: [80, 80, 90, 60, 30, 90] },
  { id: 2, name: '선수2', abilities: [75, 85, 80, 75, 70, 95] },
  { id: 3, name: '선수3', abilities: [40, 23, 55, 70, 82, 35] },
  { id: 4, name: '선수4', abilities: [73, 28, 97, 72, 30, 21] },
];
// 통신으로 받아와야할 선수들 데이터 선수 두명 + 해당 선수 구단/리그 평균(11개 데이터 이건 그냥 프론트에 박아놓을까?)

const ComparisonPage = () => {
  const [selectedPlayer1, setSelectedPlayer1] = useState(playerList[0]);
  const [selectedPlayer2, setSelectedPlayer2] = useState(playerList[1]);

  const handlePlayer1Select = (player) => {
    setSelectedPlayer1(player);
  };

  const handlePlayer2Select = (player) => {
    setSelectedPlayer2(player);
  };

  return (
    <div>
      <div>
        <h2>선수 선택</h2>
        <div>
          <label>선수 1:</label>
          <select onChange={(e) => handlePlayer1Select(playerList.find((p) => p.id === Number(e.target.value)))}>
            {playerList.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>선수 2:</label>
          <select onChange={(e) => handlePlayer2Select(playerList.find((p) => p.id === Number(e.target.value)))}>
            {playerList.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h2>RadarGraph</h2>
      <p>이 아래에 빈공간 어떻게 없애지</p>
      <p>바 색상도 테마 설정해두면 좋을 듯!!</p>
      <GraphDiv>
        <RadarGraph player1={selectedPlayer1.abilities} player2={selectedPlayer2.abilities} />
      </GraphDiv>
      <h2>Bar Graph</h2>
      <p>DB 연결 후 수정</p>
      <p>아래 zero-point의 위치를 중앙으로 고정시켜주는 기능이 없다고 함,,</p>
      <GraphDiv3>
        {/* 기존 RadarGraph 대신 ComparisonBarGraph를 사용합니다. */}
        <BarGraph player1={selectedPlayer1.abilities} player2={selectedPlayer2.abilities} />
        <BarGraph player1={selectedPlayer1.abilities} player2={selectedPlayer2.abilities} />
        <BarGraph player1={selectedPlayer1.abilities} player2={selectedPlayer2.abilities} />
      </GraphDiv3>
    </div>
  );
};

export default ComparisonPage;
