import { connect } from 'react-redux'
import { getLogin, getUser } from '../../common/redux/selectors'
import { SafeAreaView } from 'react-native'
import { STATUS_SUCCESS } from '../../common/redux/reducers/consts'
import AuthForm from './user/AuthForm'
import ConfirmationEmailView from './user/ConfirmationEmailView'
import Deeplink from './utils/Deeplink'
import PropTypes from 'prop-types'
import React from 'react'

const AppAuth = ({ loginStatus }) => {
	let mainComponent = (
		<AuthForm/>
	)

	if (loginStatus === STATUS_SUCCESS) {
		mainComponent = (
			<ConfirmationEmailView/>
		)
	}

	return (
		<React.Fragment>
			<SafeAreaView>
				<Deeplink/>
				{mainComponent}
			</SafeAreaView>
		</React.Fragment>
	)
}

const mapStateToProps = (state, ownProps) => {
	const user = getUser(state)
	const login = getLogin(state)

	return {
		userStatus: user.status,
		loginStatus: login.status
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {}
}

AppAuth.propTypes = {
	loginStatus: PropTypes.string,
	logout: PropTypes.func,
	navigation: PropTypes.object,
	userStatus: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(AppAuth)
