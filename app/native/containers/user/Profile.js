import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { getUser } from '../../../common/redux/selectors'
import { isSaaS } from '../../../common/utils/env'
import { logoutUser } from '../../../common/redux/actions/user'
import { STATUS_UNAUTHORIZED } from '../../../common/redux/reducers/consts'
import { Text, View } from 'react-native'
import Login from './Login'
import PropTypes from 'prop-types'
import React from 'react'

const Profile = ({ logout, userStatus, user }) => {
	if (isSaaS() && userStatus === STATUS_UNAUTHORIZED) {
		return (
			<Login/>
		)
	}

	let profile = []
	if (user) {
		profile = <Text style={styles.email}>{user.email}</Text>
	}

	return (
		<View style={styles.container}>
			{profile}
			<View style={styles.bottom}>
				<Button
					title={'Logout'}
					onPress={() => {
						logout()
					}}
					buttonStyle={styles.button_logout}
				/>
			</View>

		</View>
	)
}

const styles = {
	container: {
		flex: 1
	},
	bottom: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	email: {
		display: 'inline-block',
		textAlign: 'center',
		height: 40,
		lineHeight: 40,
		backgroundColor: '#e3e3e3',
		borderRadius: 5,
		marginRight: 20,
		marginLeft: 20,
		marginTop: 20
	},
	button_logout: {
		marginBottom: 40,
		marginRight: 20,
		marginLeft: 20
	}
}

const mapStateToProps = (state, ownProps) => {
	const user = getUser(state)

	return {
		userStatus: user.status,
		user: user.model
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		logout: () => dispatch(logoutUser())
	}
}

Profile.propTypes = {
	logout: PropTypes.func,
	navigation: PropTypes.object,
	userStatus: PropTypes.string,
	user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
