import React from 'react';
import Tile from './Tile/index';
import './chessboard.scss';

const Chessboard = ({ tiles }) => (
	<div className="board">
		{tiles.map((element) => (
			<Tile
				key={element.id}
				name={element.id}
				squareColor={element.squareColor}
				handleClick={element.onClick}
				piece={element.piece}
				move={element.canMoveSquare}
				selected={element.isSelectedSquare}
				giveUp={element.giveUp}
			/>
		))}
	</div>
);

export default Chessboard;

