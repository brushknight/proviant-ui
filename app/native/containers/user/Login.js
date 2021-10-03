import { backendUrl } from '../../../common/utils/link'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { Linking, Text, View } from 'react-native'
import Deeplink from '../utils/Deeplink'
import React from 'react'

const appUrl = backendUrl() + '/api/v1/auth/expo/'

const Login = () => {
	return (
		<View style={styles.container}>
			<Deeplink/>
			<Text style={styles.hint_text}>
				You will be redirected to <Text style={{ fontWeight: 'bold' }}>proviant.io</Text> where you will need to enter
				your email address, receive email and follow written there instructions
			</Text>
			<Button
				style={styles.button}
				title={'Open proviant.io for login'}
				onPress={() => {
					Linking.openURL(appUrl)
				}}
			/>
		</View>
	)
}

const styles = {
	container: {
		minHeight: '100%',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'

	},
	button: {
		marginTop: 20,
		marginRight: 20,
		marginLeft: 20
	},
	hint_text: {
		marginTop: -60,
		marginRight: 20,
		marginLeft: 20
	}
}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {}
}

Login.propTypes = {}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
