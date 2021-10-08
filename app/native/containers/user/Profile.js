import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { fetchCoreVersion } from '../../../common/redux/actions/version'
import { getUser, getVersion } from '../../../common/redux/selectors'
import { Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { isSaaS } from '../../../common/utils/env'
import { logoutUser } from '../../../common/redux/actions/user/user'
import { STATUS_UNAUTHORIZED } from '../../../common/redux/reducers/consts'
import LanguageOption from '../../components/profile/LanguageOption'
import Login from './Login'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

const Profile = ({ logout, userStatus, user, fetchCoreVersion, version }) => {
	useEffect(() => {
		fetchCoreVersion()
	}, [])

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
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle={'dark-content'}/>
			{profile}
			{/* <View style={styles.localisation_container}> */}
			{/*	<Text style={styles.localisation_title}>Language (disabled)</Text> */}
			{/*	<LanguageOption language={'en'}/> */}
			{/*	<LanguageOption language={'ru'}/> */}
			{/* </View> */}
			<View style={styles.bottom}>
				<Button
					title={'Logout'}
					onPress={() => {
						logout()
					}}
					buttonStyle={styles.button_logout}
				/>
			</View>
			<Text style={styles.version}>versions: core-{version.core.version}</Text>

		</SafeAreaView>
	)
}

const styles = {
	localisation_container: {
		flex: 0,
		flexDirection: 'column',
		height: 160,
		padding: 20
	},
	localisation_title: {
		fontSize: 22,
		paddingBottom: 10
	},

	container: {
		flex: 1
	},
	bottom: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	email: {
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
		marginRight: 20,
		marginLeft: 20
	},
	version: {
		width: '100%',
		textAlign: 'center',
		marginTop: 10,
		opacity: 0.5
	}
}

const mapStateToProps = (state, ownProps) => {
	const user = getUser(state)
	const version = getVersion(state)

	return {
		userStatus: user.status,
		user: user.model,
		version: version
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		logout: () => dispatch(logoutUser()),
		fetchCoreVersion: () => dispatch(fetchCoreVersion())
	}
}

Profile.propTypes = {
	logout: PropTypes.func,
	navigation: PropTypes.object,
	userStatus: PropTypes.string,
	user: PropTypes.object,
	fetchCoreVersion: PropTypes.func,
	version: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
