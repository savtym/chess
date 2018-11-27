import React, { Component } from 'react';
import { connect } from "react-redux";
import Sound from "react-sound";

import audioMessage from 'file-loader!../../sounds/message.mp3';
import audioEntered from 'file-loader!../../sounds/entered.mp3';
import audioLeaved from 'file-loader!../../sounds/leave.mp3';
import audioStep from 'file-loader!../../sounds/step.mp3';

import Game from './Game';


class Wrapper extends Component {

	state = {
		messages: [],
		isNewMessage: false,
		isLeavedPlayer: false,
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		const {
			fen,
			makeMove,
			player2,
			messages,
			username,
			leavedPlayer,
		} = nextProps;

		if (messages.length !== prevState.messages.length) {
			const lastMsg = messages.length && messages[messages.length - 1];

			if (lastMsg.is_insert) {
				return Object.assign({
					isStep: false,
					messages: [...messages],
					isNewMessage: lastMsg.username !== username,
				}, player2 && {
					isEntered: false,
				});
			}

			return {
				messages: [...messages],
				isNewMessage: false,
				isStep: false,
			};
		}

		if (!player2) {
			return null;
		}

		if (fen !== prevState.fen && makeMove && makeMove !== username) {
			return {
				isStep: true,
			}
		}

		return {
			isStep: false,
			isNewMessage: false,
			isLeavedPlayer: Boolean(leavedPlayer),
			isEntered: prevState.isEntered === undefined,
		};
	}

	render() {
		const {
			isStep,
			isEntered,
			isNewMessage,
			isLeavedPlayer,
		} = this.state;
		const { player1, username } = this.props;

		return (
			<div className="game-container">
				{isNewMessage && (
					<Sound url={audioMessage} playStatus={Sound.status.PLAYING}/>
				)}

				{isEntered && player1 === username && (
					<Sound url={audioEntered} playStatus={Sound.status.PLAYING}/>
				)}

				{isStep && (
					<Sound url={audioStep} playStatus={Sound.status.PLAYING}/>
				)}

				{isLeavedPlayer && (
					<Sound url={audioLeaved} playStatus={Sound.status.PLAYING}/>
				)}

				<Game/>
			</div>
		);
	}
}

const mapStateToProps = ({ playstate: { fen, makeMove, first_player, second_player, leaved_player }, chat, user }) => ({
	fen,
	makeMove,
	player1: first_player,
	player2: second_player,
	leavedPlayer: leaved_player === first_player || leaved_player === second_player ? leaved_player : null,
	messages: chat.localMessages,
	username: user.data.username,
});

export default connect(mapStateToProps)(Wrapper);
