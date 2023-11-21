import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Background =styled.div`
	background-color: lightgray;
	height: 100vh;
`

const StyledLink = styled(Link)`
	text-decoration: none;
	background-color: black;
	border-radius: 1rem;
	padding: 15px;
	margin-right: 20px;
	color: white;
	font-size: 20pt;
`
const Links = styled.div`
	position: fixed;
	bottom: 200px;
	right: 200px;
`


const HomePage = () => {
	return (
		<Background>
			<Links>
				<p>이곳은 홈페이지입니다. 아래 버튼을 클릭하여 게임/기록 페이지로 이동</p><br/>
				<StyledLink to={"/game"}>Game</StyledLink>
				<StyledLink to={"/record"}>Record</StyledLink>
			</Links>
		</Background>
	);
};

export default HomePage;