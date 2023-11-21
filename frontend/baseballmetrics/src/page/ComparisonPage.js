import React from 'react';
import RadarGraph from '../components/comparison/RadarGraph';


const player1Abill = [80, 80, 90, 60, 30, 90];
const player2Abill = [75, 85, 80, 75, 70, 95];

const ComparisonPage = () => {
	return (
		<div>
			ComparisonPage
			<RadarGraph player1={player1Abill} player2={player2Abill}/>
		</div>
	);
};

export default ComparisonPage;