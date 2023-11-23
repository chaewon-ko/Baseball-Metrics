import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Player from '../../common/Player';

const Order = styled.div`
  margin-left: 10px;
`;

const Battingorder = ({ NowOrder }) => {
  // 현재 강조해야 할 순서를 저장하는 state
  const [highlightedOrder, setHighlightedOrder] = useState(1);

  // NowOrder 값이 변경될 때마다 highlightedOrder 업데이트
  useEffect(() => {
    setHighlightedOrder(NowOrder);
  }, [NowOrder]);

  return (
    <Order>
      <Player num={1} team={"두산"} name={"양의지"} highlighted={highlightedOrder === 1} />
      <Player num={2} team={"롯데"} name={"전준우"} highlighted={highlightedOrder === 2} />
      <Player num={3} team={"한화"} name={"노시환"} highlighted={highlightedOrder === 3} />
      <Player num={4} team={"KT"} name={"강백호"} highlighted={highlightedOrder === 4} />
      <Player num={5} team={"LG"} name={"오지환"} highlighted={highlightedOrder === 5} />
      <Player num={6} team={"SSG"} name={"최정"} highlighted={highlightedOrder === 6} />
      <Player num={7} team={"KIA"} name={"최형우"} highlighted={highlightedOrder === 7} />
      <Player num={8} team={"NC"} name={"손아섭"} highlighted={highlightedOrder === 8} />
      <Player num={9} team={"삼성"} name={"구자욱"} highlighted={highlightedOrder === 9} />
    </Order>
  );
};

export default Battingorder;
