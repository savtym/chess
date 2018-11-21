import React, { Component } from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import Chess from 'chess.js';

import Chessboard from '../../Chessboard';


class Wrapper extends Component {

	chess = new Chess();

	state = {
		step: null,
	};

	static getDerivedStateFromProps({ steps }) {
		return {
			step: steps.length,
		}
	}

	onNext = () => {
		const { step } = this.state;
		this.setState({
			step: step + 1,
		});
	};

	onPrev = () => {
		const { step } = this.state;
		this.setState({
			step: step - 1,
		});
	};

	getTiles = state => {
		this.chess.load(state);
		return this.chess.SQUARES.map(tile => ({
			id: tile,
			canMoveSquare: false,
			isSelectedSquare: false,
			piece: this.chess.get(tile),
			squareColor: this.chess.square_color(tile),
		}));
	};

	render() {
		const { steps } = this.props;
		const { step } = this.state;

		const {
			time,
			state,
			username,
		} = steps[step - 1];

		return (
			<React.Fragment>
				<div className="info">
					<h4>{username}</h4>
					<h4>{moment().minutes(0).second(time).format('mm:ss')}</h4>
				</div>

				<Chessboard tiles={this.getTiles(state)}/>

				<div className="navigation">
					<Button
						bsStyle="info"
						onClick={this.onPrev}
						disabled={step === 1}
					>Prev</Button>

					<span className="total-step">
						{step}/{steps.length}
					</span>

					<Button
						bsStyle="info"
						onClick={this.onNext}
						disabled={step === steps.length}
					>Next</Button>
				</div>
			</React.Fragment>
		)
	}
}


export default Wrapper;
