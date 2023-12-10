import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { themes } from '../../../themes';

const Order = styled.div`
  margin-top: 50px;
  margin-left: 10px;
`;

const Playercard = styled.div`
  border: 1px solid white;
  border-radius: 1rem;
  padding: 10px;
  margin-bottom: 20px;
  text-align: left;
  padding-left: 20px;
`;

const PlayerData = styled.span`
  color: ${(props) => props.theme.subColor};
`;

const PlayerLabel = styled.span`
  color: white;
`;

const Player = ({ num, team, name, avg, BB, gdp, phLI, slg, obp, avg2, theme }) => {
  return (
    <Playercard theme={theme}>
      <span>#{num} </span>
      <span>{team} </span>
      <span>{name} </span>
      <PlayerLabel>타율: </PlayerLabel>
      <PlayerData>{avg} </PlayerData>
      <PlayerLabel>볼넷: </PlayerLabel>
      <PlayerData>{BB} </PlayerData>
      <PlayerLabel>병살타: </PlayerLabel>
      <PlayerData>{gdp} </PlayerData>
      <PlayerLabel>대타 영향력 지표: </PlayerLabel>
      <PlayerData>{phLI} </PlayerData>
      <PlayerLabel>장타율: </PlayerLabel>
      <PlayerData>{slg} </PlayerData>
      <PlayerLabel>출루율: </PlayerLabel>
      <PlayerData>{obp} </PlayerData>
      <PlayerLabel>득점권 타율: </PlayerLabel>
      <PlayerData>{avg2}</PlayerData>
    </Playercard>
  );
};

const BattingOrder = ({ NowOrder, theme, selectedBatters }) => {
  return (
    <ThemeProvider theme={themes[theme]}>
      <Order>
        <h2>Players' data</h2>
        {selectedBatters.map((player, index) => (
          <Player key={index} num={index + 1} team={""} name={player.이름} avg={player.타율} BB={player.볼넷} gdp={player.병살} phLI={player.phLI} slg={player.장타율} obp={player.출루율} avg2={player.득점권타율} theme={themes[theme]} />
        ))}
      </Order>
    </ThemeProvider>
  );
};

export default BattingOrder;
