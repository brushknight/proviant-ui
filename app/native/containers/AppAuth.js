import { connect } from 'react-redux'
import { getUser } from '../../common/redux/selectors'
import { isSaaS } from '../../common/utils/env'
import { logoutUser } from '../../common/redux/actions/user'
import { SafeAreaView } from 'react-native'
import { STATUS_LOADED } from '../../common/redux/reducers/consts'
import Deeplink from './utils/Deeplink'
import Login from './user/Login'
import PropTypes from 'prop-types'
import React from 'react'

const AppAuth = ({ logout, userStatus }) => {
	if (isSaaS() && userStatus === STATUS_LOADED) {
		console.log('go to AppCore')
	}

	return (
		<React.Fragment>
			<SafeAreaView>
				<Deeplink/>
				<Login/>
			</SafeAreaView>
		</React.Fragment>
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

AppAuth.propTypes = {
	logout: PropTypes.func,
	navigation: PropTypes.object,
	userStatus: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(AppAuth)
