import { userUnauthorized } from '../redux/actions/user/unauthorized'

export const handleError = (dispatch, error, onError, onNotFound, onBadRequest) => {
	if (error.response) {
		switch (error.response.status) {
		case 400:
			dispatch(onBadRequest(error.response.data.error))
			break
		case 401:
			dispatch(userUnauthorized())
			break
		case 404:
			if (error.response.data.error) {
				dispatch(onNotFound(error.response.data.error))
			} else {
				dispatch(onNotFound(error.response.data))
			}
			break
		default:
			dispatch(onError(error.response.data.error))
		}
	} else {
		dispatch(onError(error.message))
	}
}
