import { connect } from 'react-redux'
import { getUser } from '../../common/redux/selectors'
import { SafeAreaView } from 'react-native'
import Deeplink from './utils/Deeplink'
import Login from './user/Login'
import PropTypes from 'prop-types'
import React from 'react'

const AppAuth = () => {
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
	return {}
}

AppAuth.propTypes = {
	logout: PropTypes.func,
	navigation: PropTypes.object,
	userStatus: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(AppAuth)
