import { actionLoginWithPassword } from '../../../common/redux/actions/login'
import { actionRegister } from '../../../common/redux/actions/register'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { generateLoginUrl } from '../../../common/utils/link'
import { getUser } from '../../../common/redux/selectors'
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
import Deeplink from '../utils/Deeplink'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const appUrl = generateLoginUrl()

const AuthForm = ({ register, registerWithoutPassword, actionLoginWithPassword, actionLoginWithoutPassword }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [smallLogo, setSmallLogo] = useState(false)
	const [withPassword, setWithPassword] = useState(false)

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
				<View style={styles.text_container}>
					<Text style={styles.text}>Proviant</Text>
				</View>
				<View style={styles.login_via_web}>
					<Text style={styles.hint_text}>
						You will be redirected to <Text style={{ fontWeight: 'bold' }}>proviant.io</Text> where you will need to
						enter
						your email address, receive email and follow written there instructions
					</Text>
					<Button
						style={styles.button}
						title={'Open proviant.io for WEB login'}
						onPress={() => {
							Linking.openURL(appUrl)
						}}
					/>
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

					{passwordButton}
					<TouchableOpacity
						style={[styles.button, styles.button_register]}
						onPress={registerHandler}
					>
						<Text style={styles.button_text}>Registration</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.button_register]}
						onPress={loginHandler}
					>
						<Text style={styles.button_text}>Login</Text>
					</TouchableOpacity>
					{passwordRemoveButton}

				</View>

			</ScrollView>
		</KeyboardAvoidingView>

	)
}

const styles = {
	scroll_view: {
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
		paddingRight: 20
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
	text_container: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	text: {
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

	return {
		userStatus: user.status
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		register: (email, password) => dispatch(actionRegister(email, password, locale)),
		registerWithoutPassword: (email) => dispatch(actionRegister(email, null, locale)),
		actionLoginWithPassword: (email, password) => dispatch(actionLoginWithPassword(email, password, locale)),
		actionLoginWithoutPassword: (email) => dispatch(actionLoginWithPassword(email, null, locale))
	}
}

AuthForm.propTypes = {
	register: PropTypes.func,
	registerWithoutPassword: PropTypes.func,
	actionLoginWithPassword: PropTypes.func,
	actionLoginWithoutPassword: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
