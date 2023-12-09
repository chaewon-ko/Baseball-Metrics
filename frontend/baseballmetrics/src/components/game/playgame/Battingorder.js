import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { themes } from '../../../themes';

const Order = styled.div`
  margin-left: 10px;
`;

const Playercard = styled.div`
  border: 1px solid white;
  border-radius: 1rem;
  padding: 5px;
  margin-bottom: 10px;
  text-align: left;
  padding-left: 10%;
  ${({ $highlighted, theme }) =>
    $highlighted
      ? `
      border: 1px solid;
      border-color: ${theme.mainColor};
      color: ${theme.mainColor};
      background-color: ${theme.subColor};
      font-weight: 400;
      `
      : ''}
`;


const Player = ({ num, team, name, highlighted, theme }) => {
  
  return (
    <Playercard $highlighted={highlighted} theme={theme}>
      <span>{num+' '}</span>
      <span>{team+' '}</span>
      <span>{name}</span>
    </Playercard>
  );
};

const Battingorder = ({ NowOrder, theme, selectedBatters }) => {
  // 현재 강조해야 할 순서를 저장하는 state
  const [highlightedOrder, setHighlightedOrder] = useState(1);

  // NowOrder 값이 변경될 때마다 highlightedOrder 업데이트
  useEffect(() => {
    setHighlightedOrder(NowOrder);
    console.log(selectedBatters);
  }, [NowOrder]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <Order>
        <Player num={1} team={""} name={selectedBatters[0].이름} highlighted={highlightedOrder === 1} theme={themes[theme]} />
        <Player num={2} team={""} name={selectedBatters[1].이름} highlighted={highlightedOrder === 2} theme={themes[theme]} />
        <Player num={3} team={""} name={selectedBatters[2].이름} highlighted={highlightedOrder === 3} theme={themes[theme]} />
        <Player num={4} team={""} name={selectedBatters[3].이름} highlighted={highlightedOrder === 4} theme={themes[theme]} />
        <Player num={5} team={""} name={selectedBatters[4].이름} highlighted={highlightedOrder === 5} theme={themes[theme]} />
        <Player num={6} team={""} name={selectedBatters[5].이름} highlighted={highlightedOrder === 6} theme={themes[theme]} />
        <Player num={7} team={""} name={selectedBatters[6].이름} highlighted={highlightedOrder === 7} theme={themes[theme]} />
        <Player num={8} team={""} name={selectedBatters[7].이름} highlighted={highlightedOrder === 8} theme={themes[theme]} />
        <Player num={9} team={""} name={selectedBatters[8].이름} highlighted={highlightedOrder === 9} theme={themes[theme]} />
      </Order>
    </ThemeProvider>
  );
};

export default Battingorder;