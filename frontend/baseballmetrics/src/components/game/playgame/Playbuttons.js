import React, {useState} from 'react';
import styled from 'styled-components';

const Button = styled.button`
	color: white;
	margin-left: 10px;
	margin-right: 10px;
	font-size: 15pt;
	min-width: 130px;
	padding: 10px;
	background-color: black;
	border: 1px solid white;
	border-radius: 1rem;
	cursor: pointer;
`
// 그저 시연을 위한 코드
function getRandomNumber() {
  // Math.random()은 0 이상 1 미만의 난수를 반환합니다.
  // 0부터 7까지의 정수를 얻기 위해 8을 곱한 후 Math.floor()를 사용합니다.
  const randomNumber = Math.floor(Math.random() * 8);
  return randomNumber;
}

// getRandomNumber 함수를 호출하여 랜덤 숫자 얻기



const Playbuttons = ({sendData}) => {

	const GG = e => {
			console.log("button clicked")
			const randomValue = getRandomNumber();
			sendData(randomValue)
	};

	return (
		<div>
			<Button onClick={GG}>진행하기</Button>
			<Button>대타</Button>
			<Button>번트</Button>
		</div>
	);
};

export default Playbuttons;