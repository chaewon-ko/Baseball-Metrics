import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
	background-color: gray;
	height: 100px;	
`

const StyledLink = styled(Link)`

`

const Header = () => {
	return (
		<StyledDiv>
			Header: <StyledLink to={"/"}>Home</StyledLink> / <Link to={"/record"}>Record</Link> / <Link to={"/game"}>Game</Link> / <Link to={"/compare"}>Comparison</Link> / <Link to={"/explaination"}>Indicator Explanation</Link>
		</StyledDiv>
	);
};

export default Header;