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

const SelectPlayer = styled.div`
  display: inline-block;
  margin: 10px;
`
const Styledselect =  styled.select`
  color: ${(props) => props.theme.mainColor};
  background-color: ${(props) => props.theme.subTransparent};
  width: 150px;
  padding: 5px;
  text-align: center;
  border-radius: 1rem;

`

const playerList = [
  { id: 1, name: '선수1', abilities: [80, 80, 90, 60, 30, 90] },
  { id: 2, name: '선수2', abilities: [75, 85, 80, 75, 70, 95] },
  { id: 3, name: '선수3', abilities: [40, 23, 55, 70, 82, 35] },
  { id: 4, name: '선수4', abilities: [73, 28, 97, 72, 30, 21] },
];
// 통신으로 받아와야할 선수들 데이터 선수 두명 + 해당 선수 구단/리그 평균(11개 데이터 이건 그냥 프론트에 박아놓을까?)

const ComparisonPage = ({theme}) => {
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
        <h2>Select Players to Compare</h2>
        <SelectPlayer>
          <label>Player 1: </label>
          <Styledselect onChange={(e) => handlePlayer1Select(playerList.find((p) => p.id === Number(e.target.value)))}>
            {playerList.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </Styledselect>
        </SelectPlayer>
        <SelectPlayer>
          <label>Player 2: </label>
          <Styledselect onChange={(e) => handlePlayer2Select(playerList.find((p) => p.id === Number(e.target.value)))}>
            {playerList.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </Styledselect>
        </SelectPlayer>
      </div>
      <h2>RadarGraph</h2>
      <GraphDiv>
        <RadarGraph theme={theme} player1={selectedPlayer1.abilities} player2={selectedPlayer2.abilities} />
      </GraphDiv>
      <h2>Bar Graph</h2>
      <GraphDiv3>
        <BarGraph theme={theme} player1={selectedPlayer1.abilities} player2={selectedPlayer2.abilities} />
        <BarGraph theme={theme} player1={selectedPlayer1.abilities} player2={selectedPlayer2.abilities} />
        <BarGraph theme={theme} player1={selectedPlayer1.abilities} player2={selectedPlayer2.abilities} />
      </GraphDiv3>
    </div>
  );
};

export default ComparisonPage;
