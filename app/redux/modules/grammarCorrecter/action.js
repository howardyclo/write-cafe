import * as types from './action-types';

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

		return setTimeout(() => {

			const correction = [
				{
					blockKey: blockKey,
					sentence: 'listening to music',
					entityRanges: {
						offset: sentence.indexOf('listening music'),
						length: 'listening music'.length,
					}
				},
				{
					blockKey: blockKey,
					sentence: 'weather in here',
					entityRanges: {
						offset: sentence.indexOf('weather of here'),
						length: 'weather of here'.length,
					}
				}
			]

			dispatch(correctSuccess(correction));

			if (handleSuccess)
				handleSuccess(correction);
			
		}, 2000);
	}
}