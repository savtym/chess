import React from 'react';
import cx from 'classnames';

import svgs from '../../../SVGs/index';
import './tile.scss';

const Tile = ({
	squareColor,
	handleClick,
	piece,
	name,
	selected,
	move,
	giveUp,
	isFrom,
}) => {
	const className = squareColor + (selected ? '_selected' : move ? '_move' : '');

	const rootClassName = cx(className, {
		'give-up': giveUp,
		from: isFrom,
	});

	return (
		<div className={rootClassName} onClick={() => handleClick && handleClick(name)}>
			{piece &&
			<img src={svgs[piece.color + '_' + piece.type]} className="piece-img" alt={piece.color + '_' + piece.type}></img>}
		</div>
	)
};


export default Tile;