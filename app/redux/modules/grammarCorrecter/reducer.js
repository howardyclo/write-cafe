import * as types from './actionTypes';

const initialState = {
	correction: {},
	status: {
		type: 'success',
		message: 'Correct grammar'
	}
}

function formatCorrection(correction = []) {

	let formattedCorrection = {}

	correction.map(cadidate => {

		if (formattedCorrection.hasOwnProperty(cadidate.entity))
			formattedCorrection[cadidate.entity].push(cadidate)
		else 
			formattedCorrection[cadidate.entity] = [cadidate]
	});

	console.log(formattedCorrection);

	return formattedCorrection
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
			correction: formatCorrection(action.payload.correction),
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