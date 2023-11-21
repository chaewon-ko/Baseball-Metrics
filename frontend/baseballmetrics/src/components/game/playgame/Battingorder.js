import React from 'react';
import styled from 'styled-components';
import Player from '../../common/Player';

const Order = styled.div`
	margin-left: 10px;
`

const Sub = () => {
	return (
		<Order>
			<Player num={1} team={"두산"} name={"양의지"}/>
			<Player num={2} team={"롯데"} name={"전준우"}/>
			<Player num={3} team={"한화"} name={"노시환"}/>
			<Player num={4} team={"KT"} name={"강백호"}/>
			<Player num={5} team={"LG"} name={"오지환"}/>
			<Player num={6} team={"SSG"} name={"최정"}/>
			<Player num={7} team={"KIA"} name={"최형우"}/>
			<Player num={8} team={"NC"} name={"손아섭"}/>
			<Player num={9} team={"삼성"} name={"구자욱"}/>
		</Order>
	);
};

export default Sub;