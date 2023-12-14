import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Background =styled.div`
	background-color: lightgray;
	height: 100vh;
	background-image: url('/image/home.png');
	background-size: cover;
	background-position: center;
`

const StyledLink = styled(Link)`
	text-decoration: none;
	padding: 18px 77px;
	margin-right: 20px;
	color: white;
	font-size: 14pt;
	border-radius: 21px;
	border: 1px solid #FFF;
`
const Links = styled.div`
	position: fixed;
	top: 650px;
	left: 72px;
`


const HomePage = () => {
	return (
		<Background>
			<Links>
				<StyledLink to={"/game"}>게임하기</StyledLink>
				<StyledLink to={"/compare"}>기록 분석하기</StyledLink>
			</Links>
		</Background>
	);
};

export default HomePage;