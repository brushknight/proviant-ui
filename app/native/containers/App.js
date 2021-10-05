import { connect } from 'react-redux'
import { fetchUser } from '../../common/redux/actions/user'
import { getUser } from '../../common/redux/selectors'
import { isSaaS } from '../../common/utils/env'
import { STATUS_LOADED } from '../../common/redux/reducers/consts'
import AppAuth from './AppAuth'
import AppCore from './AppCore'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

const App = ({ userStatus, fetchUser }) => {
	useEffect(() => {
		fetchUser()
	}, [])

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
		fetchUser: () => dispatch(fetchUser(locale))
	}
}

App.propTypes = {
	logout: PropTypes.func,
	navigation: PropTypes.object,
	userStatus: PropTypes.string,
	fetchUser: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
