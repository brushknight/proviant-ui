import { ACTION_VERSION_CORE_LOADED } from '../actions/const'

const emptyVersion = () => {
	return {
		version: ''
	}
}

const initialState = () => {
	return {
		core: emptyVersion()
	}
}

export default function (state = initialState(), action) {
	switch (action.type) {
	case ACTION_VERSION_CORE_LOADED:
		return {
			...state,
			core: action.version
		}
	default:
		return state
	}
}
