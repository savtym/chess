import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap4-modal';
import Chess from 'chess.js';

import Round from './Round';
import Wrapper from './Wrapper';
import Loading from '../Loading';

import './History.scss';

class History extends Component {

	chess = new Chess();

	state = {
		activeGame: null,
	};

	onClickRound = ({ currentTarget }) => {
		const { id } = currentTarget.dataset;

		if (id === undefined) {
			return;
		}

		this.setState({
			activeGame: this.props.history[id],
		});
	};

	onClickReturn = () => {
		this.setState({
			activeGame: null,
		});
	};

	onCloseModal = () => {
		this.setState({
			activeGame: null,
		});

		this.props.onClose();
	};

	render() {
		const { isOpen, history } = this.props;
		const { activeGame } = this.state;

		return (
			<Modal
				visible={isOpen}
				onClickBackdrop={this.onCloseModal}
				wrapperProps={{
					className: 'c-history',
				}}
			>
				<div className="modal-header">
					<h3 className="modal-title">History</h3>
				</div>

				<div className="modal-body">
					<Loading isShow={history === null} />

					{!activeGame && history && (
						Object.keys(history).map((id, index) =>
							<Round
								key={index}
								id={id}
								index={index + 1}
								onClick={this.onClickRound}
								{...history[id]}
							/>
						))
					}

					{!activeGame && history && Object.keys(history).length === 0 && (
						<h5>You didn't play some games!</h5>
					)}

					{activeGame && <Wrapper {...activeGame} />}
				</div>

				<div className="modal-footer">
					{activeGame && (
						<Button bsStyle="warning" onClick={this.onClickReturn}>Return</Button>
					)}
					<Button bsStyle="danger" onClick={this.onCloseModal}>Close</Button>
				</div>
			</Modal>
		);
	}
}


export default History;
