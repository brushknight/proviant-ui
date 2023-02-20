import {
	ACTION_FEEDBACK_SUBMISSION_FAIL,
	ACTION_FEEDBACK_SUBMISSION_RESET,
	ACTION_FEEDBACK_SUBMISSION_SENDING,
	ACTION_FEEDBACK_SUBMISSION_SUCCESS
} from '../const'
import { generateAuthApiUrl, generateHeaders } from '../../../utils/link'
import { handleError } from '../../../utils/action'
import axios from 'axios'

const sending = () => {
	return {
		type: ACTION_FEEDBACK_SUBMISSION_SENDING
	}
}

const fail = error => {
	return {
		type: ACTION_FEEDBACK_SUBMISSION_FAIL,
		error: error
	}
}

const success = payload => {
	return {
		type: ACTION_FEEDBACK_SUBMISSION_SUCCESS,
		payload: payload
	}
}

export const feedbackFormReset = () => {
	return {
		type: ACTION_FEEDBACK_SUBMISSION_RESET
	}
}

export const feedbackFormSubmit = (dto, locale) => {
	const json = JSON.stringify(dto)
	return (dispatch) => {
		dispatch(sending())
		generateHeaders(locale).then(headers => {
			axios.post(generateAuthApiUrl('/feedback/'), json, headers)
				.then(response => {
					const data = response.data
					dispatch(success(data.data))
				})
				.catch(error => {
					handleError(dispatch, error, fail, fail, fail)
				})
		})
	}
}
