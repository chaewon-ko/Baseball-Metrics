import React from 'react';
import Game from '../components/game/Game'
import Selectplayer from '../components/game/Selectplayer';
import Ranking from '../components/game/Ranking';

const GamePage = () => {
	return (
		<div>
			<b>GamePage</b>
			<Selectplayer/>
			<Game/>
			<Ranking/>
		</div>
	);
};

export default GamePage;