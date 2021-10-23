import { actionLoginReset, actionLoginWithPassword } from '../../../common/redux/actions/login'
import { actionRegister, registerReset } from '../../../common/redux/actions/register'
import { connect } from 'react-redux'
import { generateLoginUrl } from '../../../common/utils/link'
import { getLogin, getRegister, getUser } from '../../../common/redux/selectors'
import {
	Image,
	KeyboardAvoidingView,
	Linking,
	Platform,
	ScrollView,
	StatusBar,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import { STATUS_ERROR, STATUS_SENDING } from '../../../common/redux/reducers/consts'
import Deeplink from '../utils/Deeplink'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const appUrl = generateLoginUrl()

const AuthForm = (
	{
		register,
		registerWithoutPassword,
		actionLoginWithPassword,
		actionLoginWithoutPassword,
		registerStatus,
		registerError,
		loginError,
		loginStatus,
		reset
	}) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [smallLogo, setSmallLogo] = useState(false)
	const [withPassword, setWithPassword] = useState(false)

	useEffect(() => {
		reset()
	}, [
		email, password, withPassword
	])

	const registerHandler = () => {
		if (withPassword) {
			register(email, password)
		} else {
			registerWithoutPassword(email)
		}
	}

	const loginHandler = () => {
		if (withPassword) {
			actionLoginWithPassword(email, password)
		} else {
			actionLoginWithoutPassword(email)
		}
	}

	const styleLogo = styles.logo

	if (smallLogo) {
		styleLogo.height = 100
		styleLogo.width = 100
	} else {
		styleLogo.height = 200
		styleLogo.width = 200
	}

	let passwordInput = []

	let passwordButton = (
		<TouchableOpacity
			style={[styles.button, styles.button_add_password]}
			onPress={() => {
				setWithPassword(true)
			}}
		>
			<Text style={styles.button_text}>with PASSWORD</Text>
		</TouchableOpacity>
	)

	let passwordRemoveButton = []

	if (withPassword) {
		passwordInput = (
			<TextInput
				placeholderTextColor={'#000000'}
				style={styles.input}
				placeholder={'Password'}
				secureTextEntry={true}
				onChangeText={setPassword}
				value={password}
				onFocus={() => {
					setSmallLogo(true)
				}}
				onBlur={() => {
					setSmallLogo(false)
				}}
			/>
		)
		passwordButton = []
		passwordRemoveButton = (
			<TouchableOpacity
				style={[styles.button, styles.button_remove_password]}
				onPress={() => {
					setWithPassword(false)
					setPassword(null)
				}}
			>
				<Text style={styles.button_text}>without PASSWORD</Text>
			</TouchableOpacity>
		)
	}

	let errorJsx = []

	if (loginStatus === STATUS_ERROR) {
		errorJsx = (
			<View>
				<Text style={styles.error_text}>{loginError}</Text>
			</View>
		)
	}

	if (registerStatus === STATUS_ERROR) {
		errorJsx = (
			<View>
				<Text style={styles.error_text}>{registerError}</Text>
			</View>
		)
	}

	return (

		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ height: '100%' }}>
			<Deeplink/>
			<StatusBar
				barStyle={'dark-content'}/>
			<ScrollView contentContainerStyle={styles.scroll_view}>

				<View style={styles.logo_container}>
					<Image style={styleLogo} source={require('../../assets/icon.png')}/>
				</View>
				<View style={styles.title_container}>
					<Text style={styles.title}>Proviant</Text>
				</View>
				<View style={styles.login_via_web}>
					<Text style={styles.hint_text}>
						You will be redirected to <Text style={{ fontWeight: 'bold' }}>proviant.io</Text> where you will need to
						enter
						your email address, receive email and follow written there instructions
					</Text>
					<TouchableOpacity
						style={[styles.button, styles.button_web_login]}
						onPress={() => {
							Linking.openURL(appUrl)
						}}
					>
						<Text style={styles.button_text}>Open proviant.io for WEB login</Text>
					</TouchableOpacity>

				</View>
				<View style={styles.separator}>
					<Text style={styles.separator_text}>OR</Text>
				</View>
				<View style={styles.form}>
					<TextInput
						placeholderTextColor={'#000000'}
						style={styles.input}
						placeholder={'Email'}
						keyboardType={'email-address'}
						onChangeText={setEmail}
						value={email}
						onFocus={() => {
							setSmallLogo(true)
						}}
						onBlur={() => {
							setSmallLogo(false)
						}}
					/>

					{passwordInput}

					{errorJsx}

					{passwordButton}
					<TouchableOpacity
						style={[styles.button, styles.button_register]}
						onPress={registerHandler}
					>
						<Text style={styles.button_text}>{registerStatus === STATUS_SENDING ? 'Sending...' : 'Registration'}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.button_register]}
						onPress={loginHandler}
					>
						<Text style={styles.button_text}>{loginStatus === STATUS_SENDING ? 'Sending...' : 'Login'}</Text>
					</TouchableOpacity>
					{passwordRemoveButton}

				</View>

			</ScrollView>
		</KeyboardAvoidingView>

	)
}

const styles = {
	scroll_view: {
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
	login_via_web: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 20
	},
	login_via_email: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: 20,
		paddingRight: 20
	},
	separator: {
		width: '100%',
		height: 50
	},
	separator_text: {
		width: '100%',
		height: 50,
		lineHeight: 50,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		fontStyle: 'italic'
	},
	form: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: 20,
		paddingRight: 20
	},
	input: {
		height: 40,
		borderColor: '#252525',
		borderWidth: 2,
		borderRadius: 5,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
		backgroundColor: '#ececec',
		marginBottom: 10
	},
	hint_text: {
		marginBottom: 10
	},
	error_text: {
		color: 'red'
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
	button_register: {
		marginTop: 10,
		backgroundColor: '#6ba4ce',
		borderRadius: 5
	},
	button_web_login: {
		marginTop: 10,
		backgroundColor: '#6ba4ce',
		borderRadius: 5
	},
	button_remove_password: {
		marginTop: 10,
		backgroundColor: '#d86252',
		borderRadius: 5
	},
	button_add_password: {
		marginTop: 10,
		backgroundColor: '#769040',
		borderRadius: 5
	}
}

const mapStateToProps = (state, ownProps) => {
	const user = getUser(state)
	const login = getLogin(state)
	const register = getRegister(state)

	return {
		userStatus: user.status,
		loginStatus: login.status,
		loginError: login.error,
		registerStatus: register.status,
		registerError: register.error
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		register: (email, password) => dispatch(actionRegister(email, password, locale)),
		registerWithoutPassword: (email) => dispatch(actionRegister(email, null, locale)),
		actionLoginWithPassword: (email, password) => dispatch(actionLoginWithPassword(email, password, locale)),
		actionLoginWithoutPassword: (email) => dispatch(actionLoginWithPassword(email, null, locale)),
		reset: () => {
			dispatch(actionLoginReset())
			dispatch(registerReset())
		}
	}
}

AuthForm.propTypes = {
	loginStatus: PropTypes.string,
	loginError: PropTypes.string,
	registerStatus: PropTypes.string,
	registerError: PropTypes.string,
	register: PropTypes.func,
	registerWithoutPassword: PropTypes.func,
	actionLoginWithPassword: PropTypes.func,
	reset: PropTypes.func,
	actionLoginWithoutPassword: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
