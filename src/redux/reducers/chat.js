import {
	ADDED_MESSAGE_GENERAL,
	ADDED_MESSAGE_LOCAL,
	GET_ALL_MESSAGES_GENERAL,
	GET_ALL_MESSAGES_LOCAL,
	INSERT_MESSAGE_GENERAL,
	INSERT_MESSAGE_LOCAL,
	USER_CONNECTED_GENERAL,
	USER_CONNECTED_LOCAL,
	REMOVE_MESSAGE_LOCAL,
} from '../constants/chat';

import {
	EXIT,
	GIVE_UP,
} from '../constants/ActionTypes';

export const chat = (state = { messages: [], message: '', localMessages: [], localMessage: '' }, action) => {
	switch (action.type) {
		case USER_CONNECTED_GENERAL:
		case ADDED_MESSAGE_GENERAL:
		case GET_ALL_MESSAGES_GENERAL:
			return {
				...state,
				messages: [].concat(state.messages, action.payload)
			};

		case EXIT:
		case GIVE_UP:
			return {
				...state,
				localMessages: [],
			};


		case GET_ALL_MESSAGES_LOCAL:
		case ADDED_MESSAGE_LOCAL:
		case USER_CONNECTED_LOCAL:
			return {
				...state,
				localMessages: [].concat(state.localMessages, action.payload)
			};

		case REMOVE_MESSAGE_LOCAL:
			return {
				...state,
				localMessages: [],
			};

		case INSERT_MESSAGE_GENERAL:
			return {
				...state,
				message: action.payload,
			};

		case INSERT_MESSAGE_LOCAL:
			return {
				...state,
				localMessage: action.payload
			};

		default :
			return state
	}
};
