import * as types from './action-types';

const initialState = {
	correction: [],
	status: {
		type: 'success',
		message: 'Correct grammar'
	}
}

export default function reducer(state = initialState, action) {
	switch(action.type) {
		
	case types.CORRECT_REQUEST:
		return { 
			...state,
			status: {
				...state.status,
				type: 'request',
				message: 'Correcting ...'
			}
		}

	case types.CORRECT_SUCCESS:
		return { 
			...state,
			correction: action.payload.correction,
			status: {
				...state.status,
				type: 'success',
				message: 'Correct grammar'
			}
		}

	case types.CORRECT_ERROR:
		return {
			...state,
			status: {
				...status,
				type: 'error',
				message: action.payload.error.message || 'Server error'
			}
		}

	default:
		return state
	}
}