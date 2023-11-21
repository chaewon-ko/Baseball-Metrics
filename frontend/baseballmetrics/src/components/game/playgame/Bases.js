import React from 'react';
import styled from 'styled-components';

const DiamondContainer = styled.div`
	margin-top: 50px;
	margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  transform: rotate(45deg);
  width: 100px;
  height: 100px;
`;

const BaseSquare = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid white;
	margin: 5px;
`;

const Bases = () => {
	return (
		<DiamondContainer>
			<BaseSquare/>
			<BaseSquare/>
			<BaseSquare/>
		</DiamondContainer>
	);
};

export default Bases;