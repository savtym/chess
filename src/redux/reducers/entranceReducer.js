import {
	CREATE_ROOM,
	JOIN_ROOM,
	MAKE_MOVE,
	MAKE_MOVE_UPDATE,
	ROOM_LEAVE,
	UPDATE_ROOM_STATE,
	WATCH_ROOM,
	EXIT,
	GIVE_UP,
} from "../constants/ActionTypes";
import { ROLE_BLACK, ROLE_WATCHER, ROLE_WHITE, } from "../constants/roles";

export function playstate(state = "", action) {
	switch (action.type) {

		case EXIT:
		case GIVE_UP: {
			return {};
		}

		case ROOM_LEAVE: {
			return {
				...state,
				leaved_player: action.payload
			}
		}

		case UPDATE_ROOM_STATE:
			return {
				...state,
				fen: action.payload.state,
				first_player: action.payload.first_player,
				second_player: action.payload.second_player,
				time: action.payload.time,
				leaved_player: null,
			};
		case MAKE_MOVE:
			return {
				...state,
				fen: action.payload.state
			};

		case CREATE_ROOM: {
			const { date, id: state, state: fen, time, first_player } = action.payload;
			return {
				...state,
				date,//when room was created
				state,//roomid
				fen,
				time,//main time for players
				first_player,
				role: ROLE_WHITE,
				leaved_player: null,
			};
		}
		case WATCH_ROOM:
			return {
				...state,
				role: ROLE_WATCHER
			};

		case JOIN_ROOM:
			return {
				...state,
				state: action.payload,
				role: ROLE_BLACK,
				leaved_player: null,
			};

		case MAKE_MOVE_UPDATE: {//payload is  {username, state, time, is_give_up }
			const { username: makeMove, state: fen, time, is_over: isOver } = action.payload;
			return {
				...state,
				fen,
				makeMove,
				time,
				isOver
			};
		}
		default:
			return state;
	}
}
