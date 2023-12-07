import React, { useEffect, useState } from 'react';
import Inning from './playgame/Inning';
import Bases from './playgame/Bases';
import Playbuttons from './playgame/Playbuttons';
import Nowplaying from './playgame/Nowplaying';
import Battingorder from './playgame/Battingorder';
import SBOcount from './playgame/SBOcount';
import Tips from './playgame/Tips';
import styled from 'styled-components';



const GameBox = styled.div`
	display: grid;
	grid-template-rows: repeat(2, minmax(10px,auto));
`
const GridItem1 = styled.div`
	text-align: center;
	background-color: black;
	color: white;
`;


const GridItem2 = styled.div`
	padding: 16px;
	border: 1px solid black;
	text-align: center;
	background-color: black;
	color: white;
`
const GameBox2 = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
`


const BaseSBO = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-items: center;
`

const CustomHeading = styled.h3`
  color: ${(props) => props.theme.subColor};
`;

// 현재 이닝, 베이스 상황, 아웃 상황 불러오기
// 스트라이크 카운트 볼 카운트 우리가 사용을 안하는데 어떻게 처리?
// 데이터베이스에 연결해서 선수들 정보도 가져와야 함 -> 이전 선택 페이지에서?

const Game = ({theme}) => {
	// 상태를 통해 데이터 관리
	const [data, setData] = useState(0);
	const [count, setCount] = useState(1);

	// 데이터를 설정하는 함수
	const setBase = (newData) => {
		setData(newData);
		setCount((prevCount) => (prevCount % 9) + 1);
	};

	return (
		<GameBox>
			<GridItem1>
				<CustomHeading>게임이 진행 중입니다.</CustomHeading>
				<Inning />
			</GridItem1>
			<GridItem2>
				<GameBox2>
					<Nowplaying />
					<div>
						<Tips theme={theme}>현재 게임 이닝, 스트라이크/볼/아웃 카운트에 적합한 게임 팁을 출력</Tips>
						{/* header.js에서 선택한 테마 연동하는거 구현해야함 */}
						<BaseSBO>
							<Bases baseNumber={data} />
							<SBOcount />
						</BaseSBO>
						<Playbuttons sendData={setBase} />
					</div>
					<Battingorder NowOrder={count} theme={theme}/>
				</GameBox2>
			</GridItem2>
		</GameBox>
	);
};

export default Game;