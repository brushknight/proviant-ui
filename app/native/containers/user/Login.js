import { actionLoginWithPassword } from '../../../common/redux/actions/login'
import { backendUrl } from '../../../common/utils/link'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { getUser } from '../../../common/redux/selectors'
import { KeyboardAvoidingView, Linking, Platform, ScrollView, StatusBar, Text, TextInput, View } from 'react-native'
import Deeplink from '../utils/Deeplink'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const appUrl = backendUrl() + '/api/v1/auth/expo/'

const Login = ({ actionLoginWithPassword }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const loginWithPassword = () => {
		actionLoginWithPassword(email, password)
	}

	return (
		<ScrollView contentContainerStyle={styles.scroll_view}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ height: '100%' }}>
				<StatusBar
					barStyle={'dark-content'}/>
				<Deeplink/>
				<View style={styles.login_via_web}>
					<Text style={styles.hint_text}>
						You will be redirected to <Text style={{ fontWeight: 'bold' }}>proviant.io</Text> where you will need to enter
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
				{/* <View style={styles.login_via_email}> */}
				{/*	<TextInput */}
				{/*		placeholderTextColor={'#000000'} */}
				{/*		style={styles.input} */}
				{/*		placeholder={'Email'} */}
				{/*		keyboardType={'email-address'} */}
				{/*		onChangeText={setEmail} */}
				{/*		value={email} */}
				{/*	/> */}
				{/*	<Button */}
				{/*		style={styles.button} */}
				{/*		title={'Send email with MAGIC link'} */}
				{/*		onPress={() => { */}
				{/*			console.log(appUrl) */}
				{/*			Linking.openURL(appUrl) */}
				{/*		}} */}
				{/*	/> */}
				{/* </View> */}
				<View style={styles.login_via_password}>
					<TextInput
						placeholderTextColor={'#000000'}
						style={styles.input}
						placeholder={'Email'}
						keyboardType={'email-address'}
						onChangeText={setEmail}
						value={email}
					/>

					<TextInput
						placeholderTextColor={'#000000'}
						style={styles.input}
						placeholder={'Password'}
						keyboardType={'password'}
						secureTextEntry={true}
						onChangeText={setPassword}
						value={password}
					/>

					<Button
						style={styles.button}
						title={'Login with PASSWORD'}
						onPress={loginWithPassword}
					/>
				</View>
			</KeyboardAvoidingView>

		</ScrollView>

	)
}

const styles = {
	scroll_view: {
		minHeight: '100%'
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
	login_via_password: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: 20,
		paddingRight: 20
	},
	input: {
		height: 40,
		borderColor: 'purple',
		borderWidth: 2,
		borderRadius: 5,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
		backgroundColor: 'rgba(132,0,255,0.2)',
		marginBottom: 10
	},
	button: {},
	hint_text: {
		marginBottom: 10
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
		actionLoginWithPassword: (email, password) => dispatch(actionLoginWithPassword(email, password, locale))
	}
}

Login.propTypes = {
	actionLoginWithPassword: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
