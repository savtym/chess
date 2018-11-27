import React from 'react';
import { Button } from 'react-bootstrap';

import Room from './Room';

import './rooms.scss';

import {
	createJoinRequest,
	createRoomRequest,
	createWatchRoomRequest,
} from "../../../redux/actions/entranceActions";
import { connect } from "react-redux";

class Rooms extends React.Component {
	state = {
		selectedRoom: '',
	};

	selectRoom = (room) => {
		this.setState({ selectedRoom: room });
	};

	onCreateHandler() {
		this.props.createRoomRequest(this.props.username);
	}

	onJoinHandler(param) {
		this.props.createJoinRequest(param);
	}

	onWatchHandler(param) {
		this.props.createWatchRoomRequest(param);
	}

	render() {
		return (
			<div className="rooms">
				<h3 className="rooms__description">All games</h3>

				<ul className="rooms__games">
					{this.props.rooms.map(room =>
						<Room
							key={room.id}
							firstPlayer={room.first_player}
							secondPlayer={room.second_player}
							clickHandler={() => this.selectRoom(room.id)}
							activeClass={this.state.selectedRoom === room.id ? 'active' : ''}
						/>
					)}
				</ul>

				<div className="rooms__action">
					<Button
						bsStyle="primary"
						onClick={this.onJoinHandler.bind(this, this.state.selectedRoom)}
						className="rooms__action__join"
						disabled={!this.state.selectedRoom}>Join
					</Button>

					<Button
						bsStyle="success"
						className="rooms__action__join"
						onClick={this.onCreateHandler.bind(this)}
					>Create</Button>
					<Button
						bsStyle="warning"
						className="rooms__action__watch"
						disabled={!this.state.selectedRoom}
						onClick={this.onWatchHandler.bind(this, this.state.selectedRoom)}
					>Watch</Button>
				</div>
			</div>
		)
	}
}


const mapStateToProps = state => {
	return {
		rooms: state.rooms,
		username: state.user.data.username,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		createRoomRequest: (params) => dispatch(createRoomRequest(params)),
		createJoinRequest: (params) => dispatch(createJoinRequest(params)),
		createWatchRoomRequest: (params) => dispatch(createWatchRoomRequest(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
