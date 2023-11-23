import React from 'react';
import Selectbatter from './selectplayer/Selectbatter';
import Selectpitcher from './selectplayer/Selectpitcher';

const Selectplayer = () => {
	return (
		<div>
			<Selectpitcher/>
			<Selectbatter/>
		</div>
	);
};

export default Selectplayer;