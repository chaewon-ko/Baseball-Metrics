
import React from 'react';
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
`

const Playbuttons = () => {
	return (
		<div>
			<Button>진행하기</Button>
			<Button>대타</Button>
			<Button>번트</Button>
		</div>
	);
};

export default Playbuttons;