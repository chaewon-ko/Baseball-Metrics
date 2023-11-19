import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
	background-color: gray;
	height: 100px;	
`

const Header = () => {
	return (
		<StyledDiv>
			Header: Home / Record / Game / Comparison / Indicator Explanation
		</StyledDiv>
	);
};

export default Header;