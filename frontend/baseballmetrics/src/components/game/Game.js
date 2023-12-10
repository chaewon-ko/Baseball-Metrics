import React, { useState } from 'react';
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
	align-items: center;
`

const CustomHeading = styled.h3`
  color: ${(props) => props.theme.subColor};
`;

// 현재 이닝, 베이스 상황, 아웃 상황 불러오기
// 스트라이크 카운트 볼 카운트 우리가 사용을 안하는데 어떻게 처리?
// 데이터베이스에 연결해서 선수들 정보도 가져와야 함 -> 이전 선택 페이지에서?

const Game = ({theme, selectedBatters}) => {
	// 상태를 통해 데이터 관리
  const [data, setData] = useState({ result: '', base: 0, out: 0 });
  const [count, setCount] = useState(1);
	const [showResult, setShowResult] = useState(true);


	const handleData = (newData) => {
		setData(newData);
		setCount((prevCount) => (prevCount % 9) + 1);
		setShowResult(true);

		// 2초 후에 결과 숨기기
		setTimeout(() => {
			setShowResult(false);
		}, 1500);
	};

	const getTipsByOuts = (outs) => {
		switch (outs) {
			case 0:
				return (
					<div>
						<p>무사 상황입니다.</p>
						<p>1. 주자없음: 출루가 중요합니다! 출루율이 높은 타자가 유리합니다. 만약 경기를 크게 이기고 싶다면, OPS가 높은 타자를 쓰는 것을 추천합니다.</p>
						<p>2. 1루: 큰 점수를 노리고 싶다면, OPS가 높은 타자를 쓰는 것을 추천합니다. 번트를 통해 주자를 득점권으로 진루시키는 것도 좋은 방법입니다.</p>
						<p>3. 득점권: 점수를 내고 싶다면 무사이므로 어떻게든 inplay 타구를 만들어내야 합니다. BABIP가 높은 타자를 쓰세요! 점수를 많이 내고 싶다면, 장타율이 높고 홈런이 많은 파워를 갖춘 타자를 써보세요!</p>
					</div>
				);
			case 1:
				return (
					<div>
						<p>1사 상황입니다.</p>
						<p>1. 주자 없음: 역시나 어떻게든 출루가 중요합니다. 출루율이 높은 타자를 기용하세요!</p>
						<p>2. 1루: 병살의 위험이 있습니다. 뜬공 대비 땅볼이 낮은 타자를 기용하는 것이 유리합니다.</p>
						<p>3. 득점권: 1루 주자가 없다면 BABIP가 높은 타자를 쓰는 것도 좋은 방법입니다! 점수를 많이 내고 싶다면, 장타율이 높고 홈런이 많은 파워를 갖춘 타자를 써보세요!</p>
					</div>
				);
			case 2:
				return (
					<div>
						<p>2사 상황입니다.</p>
						<p>1. 주자 없음: 기회가 많이 없으므로 큰 타구를 만들어낼 타자가 필요합니다.</p>
						<p>2. 1루: OPS가 높은 타자를 기용하여 1루 주자가 홈까지 들어올 수 있는 타구를 만들 타자를 기용하세요!</p>
						<p>3. 득점권: 클러치 상황입니다. 득점권 타율이 높은 타자를 쓰는 것이 좋습니다!</p>
					</div>
				);
			default:
				return <p>게임 상황별 팁이 표시됩니다.</p>;
		}
	};
	

	return (
		<GameBox>
			<GridItem1>
				<CustomHeading>게임이 진행 중입니다.</CustomHeading>
				<Inning iscore={data.inningScore} run={data.score} hit={data.hit} bb={data.BB}/>
			</GridItem1>
			<GridItem2>
				<GameBox2>
					<Nowplaying selectedBatters={selectedBatters}/>
					<div>
						<Tips theme={theme}>{showResult ? data.result : getTipsByOuts(data.out)}</Tips>
						<BaseSBO>
							<Bases baseNumber={data.base} theme={theme} />
							<SBOcount outs={data.out} />
						</BaseSBO>
						<Playbuttons sendData={handleData} />
					</div>
					<Battingorder selectedBatters={selectedBatters} NowOrder={count} theme={theme}/>
				</GameBox2>
			</GridItem2>
		</GameBox>
	);
};

export default Game;