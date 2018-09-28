import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import moment from 'moment';

import Day from './Day';
import Info from './Info';
import Message from './Message';

import './chat.scss';

class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userMessage: ''
		}
	}

	scrollDown() {
		const chat = document.querySelector('.chat__messages');
		chat.scrollTop = chat.scrollHeight;
	}

	componentDidUpdate() {
		this.scrollDown();
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.userMessage.trim()) {
			this.props.insertMessageChat({ game_id: this.props.roomId, message: this.state.userMessage });
			this.setState({ userMessage: '' });
		}
	}

	onChangeMessage(event) {
		const { target: { value } } = event;
		this.setState({ userMessage: value });
	}

	onKeyPress(event) {
		if (event.key === 'Enter' && event.shiftKey === false) {
			this.handleSubmit(event);
		}
	}

	handleClickButton(event) {
		this.handleSubmit(event);
	}

	getMessages() {
		const { messages } = this.props;
		if (!messages) {
			return null;
		}

		let currentDay;

		return messages.reduce((arr, message, i) => {

			if (message.isInfo) {
				arr.push(
					<Info
						key={`user_${i}`}
						user={message.user}
						isPlayer={message.isPlayer}
						isWatcher={message.isWatcher}
						isConnected={message.isConnected}
					/>
				);
				return arr;
			}

			const date = moment.unix(message.time).format('DD:MM');
			if (currentDay !== date) {
				currentDay = date;
				arr.push(
					<Day day={message.time} key={`day_${i}`} />
				);
			}

			arr.push(
				<Message
					key={i}
					time={message.time}
					message={message.message}
					author={message.username}
					isMine={message.username === this.props.user.username}
				/>
			);
			return arr;
		}, []);
	}

	render() {
		return (
			<div className="chat" style={{ maxWidth: this.props.maxWidth || '500px' }}>
				<div className="chat__messages">
					{this.getMessages()}
				</div>

				<div className="chat__textarea">
					<form>
					<textarea
						value={this.state.userMessage}
						form="usrform"
						placeholder="Write a message..."
						className="chat__textarea__message"
						onKeyPress={(event) => this.onKeyPress(event)}
						onChange={(event) => this.onChangeMessage(event)}>
					</textarea>

						<Button
							bsStyle='success'
							onClick={this.handleClickButton.bind(this)}
							disabled={!this.state.userMessage}
							className='chat__textarea__send'
						>Send</Button>
					</form>
				</div>
			</div>
		)
	}
}

const matStateToProps = (state) => ({
	user: state.user.data
});

export default connect(matStateToProps)(Chat);
