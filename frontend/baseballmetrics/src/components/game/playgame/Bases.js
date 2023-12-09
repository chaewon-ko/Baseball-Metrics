import React from 'react';
import styled from 'styled-components';

const DiamondContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  transform: rotate(45deg);
  width: 100px;
  height: 100px;
`;

const BaseSquare = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid white;
  margin: 5px;
  ${({ $isBase }) => $isBase && 'background-color: white;'}
`;

//  ${(props) => props.theme.mainColor}

const Bases = ({ baseNumber, theme }) => {
  // baseNumber가 null이면 기본값을 사용
  const binaryString = (baseNumber || 0).toString(2).padStart(3, '0');

  return (
    <DiamondContainer>
      <BaseSquare $isBase={binaryString[1] === '1'} />
      <BaseSquare $isBase={binaryString[2] === '1'} />
      <BaseSquare $isBase={binaryString[0] === '1'} />
    </DiamondContainer>
  );
};

export default Bases;
