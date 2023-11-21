import React, { useState } from 'react';
import RadarGraph from '../components/comparison/RadarGraph';
import styled from 'styled-components';

const GraphDiv = styled.div`
  margin: 0 auto;
  width: 600px;
`;

const playerList = [
  { id: 1, name: '선수1', abilities: [80, 80, 90, 60, 30, 90] },
  { id: 2, name: '선수2', abilities: [75, 85, 80, 75, 70, 95] },
  { id: 3, name: '선수3', abilities: [40, 23, 55, 70, 82, 35] },
  { id: 4, name: '선수4', abilities: [73, 28, 97, 72, 30, 21] },
];

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
      <GraphDiv>
        <RadarGraph player1={selectedPlayer1.abilities} player2={selectedPlayer2.abilities} />
      </GraphDiv>
    </div>
  );
};

export default ComparisonPage;
