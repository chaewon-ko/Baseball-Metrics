import React from 'react';
import styled from 'styled-components';
import playerImage from './playerpicture.jpg'; // 실제 파일 경로로 수정해야 합니다.

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Playercard = styled.div`
  width: 100%;
  border: 1px solid white;
  border-radius: 1rem;
  padding: 5px;
  margin-bottom: 10px;
  ${({ $highlighted, theme }) =>
    $highlighted
      ? `
			border: 1px solid;
      border-color: ${theme.mainColor};
			background-color: rgba(255,255,255,0.2);
  `
      : ''}
`;

const Picture = styled.div`
  height: 200px;
  width: 150px;
  border: 1px solid white;
  margin: 0 auto;
  margin-bottom: 10px;
  background-color: gray;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Player = ({ num, team, name, highlighted }) => {
  return (
    <Playercard $highlighted={highlighted}>
      <span>{num+' '}</span>
      <span>{team+' '}</span>
      <span>{name}</span>
    </Playercard>
  );
};

const Nowplaying = ({selectedBatters}) => {
  return (
    <Container>
      <Picture>
        <img src={playerImage} alt="선수 사진" />
      </Picture>
      <Player num={1} team={""} name={selectedBatters[9].이름} />
      <Player num={2} team={""} name={selectedBatters[10].이름} />
      <Player num={3} team={""} name={selectedBatters[11].이름} />
      <Player num={4} team={""} name={selectedBatters[12].이름} />
      <Player num={5} team={""} name={selectedBatters[13].이름} />
      <Player num={6} team={""} name={selectedBatters[14].이름} />
    </Container>
  );
};

export default Nowplaying;
