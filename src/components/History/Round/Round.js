import React from 'react';
import moment from 'moment';

import './Round.scss';


const Round = ({ index, id, first_player, second_player, steps, onClick }) => {
	const time = steps.reduce((p, n) => p + n.time, 0);

	return (
		<div className="c-round" onClick={onClick} data-id={id}>
			<span className="index">{index}</span>

			<div className="description">
				<h6>{first_player} / {second_player}</h6>
				<h6>steps: {steps.length}</h6>
				<h6>total time: {moment().minutes(0).second(time).format('mm:ss')}</h6>
			</div>
		</div>
	);
};


export default Round;
