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
  background-color: ${(props) => (props.isBase ? 'white' : 'transparent')};
`;

const Bases = ({ baseNumber }) => {
  // Convert the decimal number to a binary string with leading zeros
  const binaryString = baseNumber.toString(2).padStart(3, '0');

  return (
    <DiamondContainer>
      <BaseSquare isBase={binaryString[1] === '1'} />
      <BaseSquare isBase={binaryString[2] === '1'} />
      <BaseSquare isBase={binaryString[0] === '1'} />
    </DiamondContainer>
  );
};

export default Bases;
