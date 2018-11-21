import {
	SET_HISTORY_ALL,
} from '../constants/history';


const initState = {
	allHistory: null,
};


export default function history(state = initState, action) {
	switch (action.type) {
		case SET_HISTORY_ALL: {
			return {
				...state,
				allHistory: action.payload,
			}
		}

		default:
			return state;
	}
}
