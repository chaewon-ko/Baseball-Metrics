import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
	border: 1px solid white;
	border-radius: 1rem;
	padding: 10px;
	display: grid;
	grid-template-columns: repeat(12,1fr);

	width: 800px;
	margin: 0 auto;
`

const GridItem = styled.div`
	display: grid;
	grid-template-rows: 1fr 1fr;
`
const Top = styled.div`
	padding-bottom: 10px;
	border-bottom: 1px solid white;
`

const Bot = styled.div`
	padding-top: 10px;
`

const Top9 = styled.div`
	padding-bottom: 10px;
	border-bottom: 1px solid white;
	border-right: 1px solid white;
`
const Bot9 = styled.div`
	padding-top: 10px;
	border-right: 1px solid white;
`
	
const Inning = () => {
	return (
		<GridContainer>
			<GridItem>
				<Top>1</Top>
				<Bot>0</Bot>
			</GridItem>
			<GridItem>
				<Top>2</Top>
				<Bot>0</Bot>
			</GridItem>
			<GridItem>
				<Top>3</Top>
				<Bot>0</Bot>
			</GridItem>
			<GridItem>
				<Top>4</Top>
				<Bot>0</Bot>
			</GridItem>
			<GridItem>
				<Top>5</Top>
				<Bot>0</Bot>
			</GridItem>
			<GridItem>
				<Top>6</Top>
				<Bot>0</Bot>
			</GridItem>
			<GridItem>
				<Top>7</Top>
				<Bot>0</Bot>
			</GridItem>
			<GridItem>
				<Top>8</Top>
				<Bot>0</Bot>
			</GridItem>
			<GridItem>
				<Top9>9</Top9>
				<Bot9>0</Bot9>
			</GridItem>
			<GridItem>
				<Top>R</Top>
				<Bot>0</Bot>
			</GridItem>
			<GridItem>
				<Top>H</Top>
				<Bot>0</Bot>
			</GridItem>
			<GridItem>
				<Top>B</Top>
				<Bot>0</Bot>
			</GridItem>
		</GridContainer>
	);
};

export default Inning;