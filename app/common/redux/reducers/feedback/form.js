import {
	ACTION_FEEDBACK_SUBMISSION_FAIL,
	ACTION_FEEDBACK_SUBMISSION_RESET,
	ACTION_FEEDBACK_SUBMISSION_SENDING,
	ACTION_FEEDBACK_SUBMISSION_SUCCESS
} from '../../actions/const'
import { STATUS_DEFAULT, STATUS_ERROR, STATUS_SENDING, STATUS_SUBMITTED } from '../consts'

const initialState = () => {
	return {
		status: STATUS_DEFAULT,
		error: null
	}
}

export default function (state = initialState(), action) {
	switch (action.type) {
	case ACTION_FEEDBACK_SUBMISSION_RESET:
		return {
			...initialState()
		}
	case ACTION_FEEDBACK_SUBMISSION_SENDING:
		return {
			...state,
			status: STATUS_SENDING,
			error: null
		}
	case ACTION_FEEDBACK_SUBMISSION_FAIL:
		return {
			...state,
			status: STATUS_ERROR,
			error: action.error
		}
	case ACTION_FEEDBACK_SUBMISSION_SUCCESS:
		return {
			...state,
			status: STATUS_SUBMITTED,
			error: null
		}
	default:
		return state
	}
}
