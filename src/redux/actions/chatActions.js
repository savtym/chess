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
	USER_DISCONNECTED_LOCAL,
} from '../constants/chat';

export const getMessagesGeneralChat = (payload) => {
	return {
		type: GET_ALL_MESSAGES_GENERAL,
		payload,
	}
};

export const getMessagesLocalChat = (payload) => {
	return {
		type: GET_ALL_MESSAGES_LOCAL,
		payload
	}
};

export const insertMessageGeneralChat = (payload) => {
	return {
		type: INSERT_MESSAGE_GENERAL,
		payload,
	}
};

export const addedMessageToGeneralChat = (payload) => {
	return {
		type: ADDED_MESSAGE_GENERAL,
		payload
	}
}


export const connectNewUser = (user) => ({
	type: USER_CONNECTED_GENERAL,
	payload: {
		...user,
		isInfo: true,
	},
});


export const watcher = (user) => ({
	type: USER_CONNECTED_LOCAL,
	payload: {
		...user,
		isInfo: true,
	},
});


export const connectOpponentToGame = (user) => ({
	type: USER_CONNECTED_LOCAL,
	payload: {
		...user,
		isInfo: true,
		isPlayer: true,
	},
});


export const insertMessageLocalChat = (payload) => {
	return {
		type: INSERT_MESSAGE_LOCAL,
		payload
	}
};

export const addedMessageToLocalChat = (payload) => {
	return {
		type: ADDED_MESSAGE_LOCAL,
		payload
	}
};

export const removeMessagesFromLocalChat = () => {
	return {
		type: REMOVE_MESSAGE_LOCAL,
	}
};

export const disconnectedUser = () => {
	return {
		type: USER_DISCONNECTED_LOCAL,
	}
};