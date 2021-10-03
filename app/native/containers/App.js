import { connect } from 'react-redux'
import { getUser } from '../../common/redux/selectors'
import { isSaaS } from '../../common/utils/env'
import { logoutUser } from '../../common/redux/actions/user'
import { STATUS_LOADED } from '../../common/redux/reducers/consts'
import AppAuth from './AppAuth'
import AppCore from './AppCore'
import PropTypes from 'prop-types'
import React from 'react'

const App = ({ logout, userStatus }) => {
	if (isSaaS() && userStatus === STATUS_LOADED) {
		return (
			<AppCore/>
		)
	}

	return (
		<AppAuth/>
	)
}

const mapStateToProps = (state, ownProps) => {
	const user = getUser(state)

	return {
		userStatus: user.status
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		logout: () => dispatch(logoutUser())
	}
}

App.propTypes = {
	logout: PropTypes.func,
	navigation: PropTypes.object,
	userStatus: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
