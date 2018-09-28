import React from 'react';
import './chessboardHeader.scss';
import Timer from './Timer';
import { Button } from 'react-bootstrap';

const ChessboardHeader = ({ back, backText, playerName, time }) => {
	const timer = time !== undefined && (
		<Timer time={time} playerName={playerName}/>
	);
	return (
		<div className="chessboard-header">
			<Button bsStyle="danger" {...back}>{backText}</Button>

			<div className="chessboard-header__text">
				<h3>{playerName}</h3>
			</div>

			{timer && (
				<div className="chessboard-header__text">{timer}</div>
			)}
		</div>
	)
};

export default ChessboardHeader;
