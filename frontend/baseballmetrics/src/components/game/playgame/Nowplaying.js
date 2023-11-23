import React from 'react';
import styled from 'styled-components';
import Player from '../../common/Player';

// 이미지 파일 경로
import playerImage from './playerpicture.jpg'; // 실제 파일 경로로 수정해야 합니다.

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

const Nowplaying = () => {
  return (
    <div>
      <Picture>
        <img src={playerImage} alt="선수 사진" />
        <br />
      </Picture>
      <Player num={1} team={"롯데"} name={"김주찬"} />
      <Player num={2} team={"롯데"} name={"황재균"} />
      <Player num={3} team={"롯데"} name={"강민호"} />
      <Player num={4} team={"롯데"} name={"이대호"} />
      <Player num={5} team={"롯데"} name={"가르시아"} />
      <Player num={6} team={"롯데"} name={"전준우"} />
    </div>
  );
};

export default Nowplaying;
