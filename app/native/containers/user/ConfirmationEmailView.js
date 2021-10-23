import { actionLoginReset } from '../../../common/redux/actions/login'
import { actionRegister, registerReset } from '../../../common/redux/actions/register'
import { connect } from 'react-redux'
import { getUser } from '../../../common/redux/selectors'
import { Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import Deeplink from '../utils/Deeplink'
import PropTypes from 'prop-types'
import React from 'react'

const ConfirmationEmailView = ({ reset }) => {
	return (

		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ height: '100%' }}>
			<Deeplink/>
			<StatusBar
				barStyle={'dark-content'}/>
			<ScrollView contentContainerStyle={styles.scroll_view}>

				<View style={styles.logo_container}>
					<Image style={styles.logo} source={require('../../assets/icon.png')}/>
				</View>
				<View style={styles.title_container}>
					<Text style={styles.title}>Proviant</Text>
				</View>
				<View style={styles.text_container}>
					<Text style={styles.hint_text}>
						We have sent you an email with magic link. Check you email to finish authentication.
					</Text>
					<TouchableOpacity
						style={[styles.button, styles.button_back]}
						onPress={reset}
					>
						<Text style={styles.button_text}>back to login</Text>
					</TouchableOpacity>
				</View>

			</ScrollView>
		</KeyboardAvoidingView>

	)
}

const styles = {
	scroll_view: {
		// minHeight: '100%'
		// flex: 0
		paddingBottom: 20
	},
	logo: {
		height: 200,
		width: 200,
		resizeMode: 'cover'
	},
	logo_container: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	text_container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20
	},
	title_container: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold'
	},
	button: {
		height: 40
	},
	button_text: {
		height: 40,
		lineHeight: 40,
		textAlign: 'center',
		fontSize: 16
	},
	button_back: {
		marginTop: 20,
		backgroundColor: '#6ba4ce',
		borderRadius: 5
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
		reset: () => {
			dispatch(actionLoginReset())
			dispatch(registerReset())
		}
	}
}

ConfirmationEmailView.propTypes = {
	reset: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationEmailView)
