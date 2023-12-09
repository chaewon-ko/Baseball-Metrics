import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  border: 1px solid white;
  border-radius: 1rem;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 800px;
  margin: 0 auto;
`;

const GridItem = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const Top = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid white;
`;

const Bot = styled.div`
  padding-top: 10px;
`;

const Top9 = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
`;

const Bot9 = styled.div`
  padding-top: 10px;
  border-left: 1px solid white;
`;

const Inning = ({ iscore = [0,0,0,0,0,0,0,0,0], run = 0, hit = 0, bb = 0 }) => {
  const inning = [1, 2, 3, 4, 5, 6, 7, 8, 9, "R", "H", "B"];
	// 나중에 데이터 받아와서 이용하기!
  const botData = [...iscore, run, hit, bb]

  return (
    <GridContainer>
      {inning.map((item, index) => (
        <GridItem key={index}>
          {index === 9 ? (
            <Top9>{item}</Top9>
          ) : (
            <Top>{item}</Top>
          )}
          {index === 9 ? (
            <Bot9>{botData[index]}</Bot9>
          ) : (
            <Bot>{botData[index]}</Bot>
          )}
        </GridItem>
      ))}
    </GridContainer>
  );
};

export default Inning;
