import {
	SET_HISTORY_ALL,
} from "../constants/history";

export default function history(state = "", action) {
	switch (action.type) {
		case SET_HISTORY_ALL: {
			return {
				...state,
				allHistory: action.payload
			}
		}

		default:
			return state;
	}
}
