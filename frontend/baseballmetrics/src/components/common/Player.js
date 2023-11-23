import React from 'react';
import styled from 'styled-components';

const Playercard = styled.div`
  border: 1px solid white;
  border-radius: 1rem;
  padding: 5px;
  margin-bottom: 10px;
  ${({ $highlighted }) =>
    $highlighted
      ? `
			border: 1px solid red;
			background-color: rgba(255,255,255,0.2);
  `
      : ''}
`;

const Player = (props) => {
  return (
    <Playercard $highlighted={props.highlighted}>
      <span>{props.num}</span>
      <span>{props.team}</span>
      <span>{props.name}</span>
    </Playercard>
  );
};

export default Player;
