import {
	GET_HISTORY_ALL,
	SET_HISTORY_ALL,
} from '../constants/history';


export const getAllHistory = () => ({
	type: GET_HISTORY_ALL,
});

export const setAllHistory = (payload) => ({
	type: SET_HISTORY_ALL,
	payload,
});