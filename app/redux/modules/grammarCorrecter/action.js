import config from '../../../config';
import * as types from './actionTypes';
import { mockCorrection } from './mockData.js';

const correctRequest = (sentence) => ({
	type: types.CORRECT_REQUEST,
	payload: { sentence }
});

const correctSuccess = (correction) => ({
	type: types.CORRECT_SUCCESS,
	payload: { correction }
});

const correctError = (error) => ({
	type: types.CORRECT_ERROR,
	payload: { error }
});

export function correct(blockKey, sentence, handleSuccess, handleError) {

	return (dispatch, getState) => {

		dispatch(correctRequest(sentence));

		// return $.ajax({
		// 	type: 'GET',
		// 	url: `${config.API.BASE_URL}/${sentence}`,
		// 	success: function(correction) {
		// 		dispatch(correctSuccess(correction));

		// 		if (handleSuccess)
		// 			handleSuccess(blockKey, correction);
		// 	},
		// 	error: function(err) {
		// 		dispatch(correctError({
		// 			message: 'Server error'
		// 		}));

		// 		if (handleError)
		// 			handleError();
		// 	}
		// });

		return setTimeout(() => {

			const correction = mockCorrection;

			dispatch(correctSuccess(correction));

			if (handleSuccess)
				handleSuccess(blockKey, correction);
			
		}, 2000);
	}
}