import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
	cursor: pointer;
`



const Playbuttons = ({ sendData }) => {

	const GG = e => {
		axios.get('/play')
			.then(function (response) {
				console.log(response);
				sendData(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
	};

	const BB = e => {
		axios.get('/bunt')
		.then(function(response){
			console.log(response)
			sendData(response.data)
		})
		.catch(function(error){
			console.log(error);
		})
	}
	
	const Sub = e => {
		axios.post()
	}

	return (
		<div>
			<Button onClick={GG}>진행하기</Button>
			<Button onClick={Sub}>대타</Button>
			<Button onClick={BB}>번트</Button>
		</div>
	);
};

export default Playbuttons;