import React from 'react';
import styled from 'styled-components';

const Playercard = styled.div`
	border: 1px solid white;
	border-radius: 1rem;
	padding: 5px;
	margin-bottom: 10px;
`

const Player = (props) => {
	return (
		<Playercard>
			<span>{props.num}</span>
			<span>{props.team}</span>
			<span>{props.name}</span>
		</Playercard>
	);
};

export default Player;