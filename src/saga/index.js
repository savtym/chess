import { call, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import * as Api from "../utils/Api"
import * as actions from "../redux/actions/entranceActions"
import {
	CREATE_ROOM_REQUEST,
	GIVE_UP,
	JOIN_ROOM_REQUEST,
	MAKE_MOVE,
	WATCH_ROOM_REQUEST,
	EXIT,
} from "../redux/constants/ActionTypes"
import { GET_HISTORY_ALL } from "../redux/constants/history"
import { LOGIN } from "../redux/constants/user"
import * as chatActions from '../redux/actions/chatActions';
import * as historyActions from '../redux/actions/history';
import { INSERT_MESSAGE_GENERAL, INSERT_MESSAGE_LOCAL } from '../redux/constants/chat';
import config from '../config';

function connect() {
	const socket = io(config.apiDomain);
	return new Promise(resolve => {
		socket.on('connect', () => {
			resolve(socket);
		});
	});
}

function subscribe(socket) {
	return eventChannel(emit => {
		socket.on('rooms', (data) => {
			emit(actions.roomsList(data));
		});

		socket.on('user.connected', (data) => {
			emit(chatActions.connectNewUser({ user: data, isConnected: true }));
		});

		socket.on('room.connect-visitor', (data) => {
			emit(chatActions.watcher({ user: data, isConnected: true }));
		});

		socket.on('room.connect', (data) => {
			console.log('room.connect', data);
			emit(chatActions.connectOpponentToGame({ user: data.second_player, isConnected: true }));
			emit(actions.updateRoomState(data));
		});

		socket.on('room.move', (data) => {
			emit(actions.makeMoveUpdate(data));
		});

		socket.on('history.all', (data) => {
			emit(historyActions.setAllHistory(data));
		});

		socket.on('room.disconnect', (data) => {
			emit(actions.roomLeave(data.user));
			emit(chatActions.watcher({
				user: data.user,
				isConnected: false,
				isWatcher: data.isVisitor,
			}));
		});

		socket.on('room.win', (data) => {//all users from the room will receive, when someone has won the game
			// emit(actions.roomLeave(data));
		});

		socket.on('user.disconnect', (data) => {//if someone close the game, (data = name of player)
			emit(chatActions.disconnectedUser({ user: data, isConnected: false }));
		});

		socket.on('chat.general', (data) => {
			if (data.is_insert) {
				emit(chatActions.addedMessageToGeneralChat([data]))
			} else {
				emit(chatActions.getMessagesGeneralChat(data))
			}
		});

		socket.on('chat.local', (data) => {
			if (data.is_insert) {
				emit(chatActions.addedMessageToLocalChat([data]))
			} else {
				emit(chatActions.getMessagesLocalChat(data))
			}
		});

		socket.on('disconnect', e => {
			// TODO: handle
		});
		return () => {
		};
	});
}

function* read(socket) {
	const channel = yield call(subscribe, socket);
	while (true) {
		let action = yield take(channel);
		yield put(action);
	}
}

function* write(socket, token) {
	yield fork(createRoomSaga, socket, token, "room.create", CREATE_ROOM_REQUEST, actions.createRoom);
	yield fork(joinRoomSaga, socket, token, "room.connect", JOIN_ROOM_REQUEST, actions.joinRoom);
	yield fork(joinRoomSaga, socket, token, "room.connect-visitor", WATCH_ROOM_REQUEST, actions.watchRoom);
	yield fork(makeMoveSaga, socket, token, "room.move", MAKE_MOVE);
	yield fork(insertMessagesToGeneral, socket, token, "chat.general.insert", INSERT_MESSAGE_GENERAL, chatActions.insertMessageGeneralChat);
	yield fork(inserMessagesToLocal, socket, token, "chat.local.insert", INSERT_MESSAGE_LOCAL, chatActions.insertMessageLocalChat);
	yield fork(giveUpSaga, socket, token, "room.give-up", GIVE_UP);
	yield fork(giveUpSaga, socket, token, "room.give-up", EXIT);
	yield fork(getHistoryAll, socket, token, "history.all", GET_HISTORY_ALL);
}

function* insertMessagesToGeneral(socket, token) {
	while (true) {
		try {
			const { payload } = yield take(INSERT_MESSAGE_GENERAL);
			const data = yield new Promise(resolve => {
				socket.emit("chat.general.insert", { token, message: payload.message }, (data) => {
					resolve(data)
				})
			});
			if (data.err) {
				console.log(data.err)
			}
		} catch (error) {

		}
	}
}

function* inserMessagesToLocal(socket, token) {
	while (true) {
		try {
			const { payload } = yield take(INSERT_MESSAGE_LOCAL);
			const data = yield new Promise(resolve => {
				socket.emit("chat.local.insert", Object.assign({ token }, payload), (data) => {
					resolve(data)
				})
			})
			if (data.err) {
				console.log(data.err)
			}
		} catch (error) {

		}
	}
}

function* createRoomSaga(socket, token, emitType, actionType, action) {
	while (true) {
		try {
			const { payload } = yield take(actionType)
			const data = yield new Promise(resolve => {
				socket.emit(emitType, { token, state: payload.fen }, (data) => {
					resolve(data)
				})
			});

			if (!data.err) {
				yield put(actions.route("chessboard"));
				yield put(chatActions.removeMessagesFromLocalChat());
				yield put(action(Object.assign({ state: payload.fen, first_player: payload.first_player }, data.data)));
			} else {
				console.log("ERROR ", data.err)
			}
		} catch (error) {
			console.log("CATCH TRIGGERED in saga.createRoomSaga", error)
		}

	}
}

function* joinRoomSaga(socket, token, emitType, actionType, action) {
	while (true) {
		try {
			const { payload } = yield take(actionType);
			const data = yield new Promise(resolve => {
				socket.emit(emitType, { token, game_id: payload }, (data) => {
					resolve(data)
				})
			});
			if (!data.err) {
				yield put(actions.route("chessboard"));
				yield put(action(payload))
			}
			else {
				console.log("ERROR ", data.err)
			}
		} catch (error) {
			console.log("CATCH TRIGGERED in saga.joinRoomSaga", error)
		}
	}
}

function* makeMoveSaga(socket, token, emitType, actionType) {
	while (true) {
		try {
			const { payload } = yield take(actionType)
			const data = yield new Promise(resolve => {
				const { game_id, state, is_over } = payload
				socket.emit(emitType, { token, game_id, state, is_over }, (data) => {
					resolve(data)
				})//send {token, game_id, state, is_over}
			})
			if (data.err) {
				console.log("ERROR ", data.err)
			}
		} catch (error) {
			console.log("CATCH TRIGGERED in saga.makeMoveSaga", error)
		}
	}
}

function* giveUpSaga(socket, token, emitType, actionType) {
	while (true) {
		try {
			const { payload } = yield take(actionType);
			const data = yield new Promise(resolve => {
				const { game_id } = payload;
				socket.emit(emitType, { token, game_id }, (data) => {
					resolve(data)
				})
			});
			if (data.err) {
				console.log("ERROR ", data.err)
			}
		} catch (error) {
			console.log("CATCH TRIGGERED in saga.giveUpSaga", error)
		}
	}
}

function* getHistoryAll(socket, token, emitType, actionType) {
	while (true) {
		try {
			yield take(actionType);
			const data = yield new Promise(resolve => {
				socket.emit(emitType, { token }, (data) => resolve(data))
			});
			if (data.err) {
				console.log("ERROR ", data.err)
			}
		} catch (error) {
			console.log("CATCH TRIGGERED in history.all", error)
		}
	}
}

function* handleIO(socket, token) {
	yield fork(read, socket);
	yield fork(write, socket, token);
}

function* flow() {
	let socket
	while (true) {
		const signIn = yield take(LOGIN);
		const token = signIn.data.token
		if (!socket) {
			//send requets for open socket
			yield call(Api.createSocket, token);
			socket = yield call(connect); // connect to sokket
			yield fork(handleIO, socket, token);
		}
		// window.socket = socket;//for debug, remove after
	}
}

export default function* rootSaga() {
	yield fork(flow);
}