import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Background =styled.div`
	background-color: lightgray;
`

const HomePage = () => {
	return (
		<Background>
			<Link to={"/game"}>Game</Link>
			<br/>
			<Link to={"/record"}>Record</Link>
			<p>Here is HomePage</p>
		</Background>
	);
};

export default HomePage;