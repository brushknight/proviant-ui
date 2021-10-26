import { ActivityIndicator, Image, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { fetchUser } from '../../common/redux/actions/user/user'
import { getUser } from '../../common/redux/selectors'
import { init } from '../../common/utils/ga'
import { isSaaS } from '../../common/utils/env'
import { STATUS_DEFAULT, STATUS_LOADED, STATUS_UNAUTHORIZED } from '../../common/redux/reducers/consts'
import AppAuth from './AppAuth'
import AppCore from './AppCore'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

const App = ({ userStatus, fetchUser }) => {
	useEffect(() => {
		if (userStatus === STATUS_DEFAULT) {
			fetchUser()
			init()
		}
	}, [userStatus])

	if (isSaaS() && userStatus === STATUS_LOADED) {
		return (
			<AppCore/>
		)
	}

	if (isSaaS() && userStatus === STATUS_UNAUTHORIZED) {
		return (
			<AppAuth/>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.container_inner}>
				<Image style={styles.image} source={require('../assets/splash.png')}/>

			</View>
			<View style={styles.container_inner}>
				<Text style={styles.text}>Proviant</Text>
			</View>
			<View style={[styles.container_inner, styles.loader]}>
				<ActivityIndicator size="large" color="black"/>
			</View>
		</View>
	)
}

const styles = {
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	container_inner: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	image: {
		height: 200,
		width: 200,
		resizeMode: 'cover'
	},
	text: {
		fontSize: 30,
		fontWeight: 'bold'
	},
	loader: {
		marginTop: 20
	}
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
