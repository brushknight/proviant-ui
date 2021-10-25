import { connect } from 'react-redux'
import { feedbackFormReset, feedbackFormSubmit } from '../../../common/redux/actions/feedback/form'
import { getFeedbackForm } from '../../../common/redux/selectors'
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {
	STATUS_CREATED,
	STATUS_DEFAULT,
	STATUS_ERROR,
	STATUS_SENDING,
	STATUS_SUBMITTED
} from '../../../common/redux/reducers/consts'
import Deeplink from '../utils/Deeplink'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import StatusIndicator from '../../components/generic/StatusIndicator'

const Feedback = ({ error, reset, status, submit, onClose, style }) => {
	const [text, setText] = useState('')
	const [isValid, setIsValid] = useState(false)

	const emptyForm = () => {
		setText('')
	}

	useEffect(() => {
		if (status === STATUS_SUBMITTED) {
			reset()
			emptyForm()
			onClose()
		}

		if (text !== '') {
			setIsValid(true)
		} else {
			setIsValid(false)
		}
	}, [status, text])

	const onSubmit = () => {
		if (isValid) {
			submit({
				text
			})
		}
	}

	let errorJsx = []

	if (status === STATUS_ERROR) {
		errorJsx = (
			<View style={styles.hint_error}>
				<Text style={styles.hint_error_text}>
					{error}
				</Text>
			</View>
		)
	}

	return (
		<TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={[style, styles.container]}>

			<Deeplink/>

			<TextInput
				placeholder={'Type your feedback here...'}
				style={styles.text}
				onChangeText={setText}
				value={text}
				autoFocus={true}
				placeholderTextColor="grey"
				multiline={true}
			/>

			{errorJsx}
			<View style={styles.button_container}>

				<TouchableOpacity
					style={[styles.button, styles.button_cancel]}
					onPress={onClose}
				>
					<Icon name={'times'} size={20} style={styles.button_icon}/>
					<Text style={styles.button_text}>Cancel</Text>
				</TouchableOpacity>

				<StatusIndicator
					style={styles.action_indicator}
					isActive={status === STATUS_SENDING}
					isSuccess={ status === STATUS_SUBMITTED}
				/>

				<TouchableOpacity
					style={[styles.button, styles.button_send, isValid ? null : styles.disabled]}
					onPress={onSubmit}
				>
					<Icon name={'paper-plane'} size={18} style={styles.button_icon}/>
					<Text style={styles.button_text}>Send</Text>
				</TouchableOpacity>

			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		// minHeight: 150
	},
	text: {
		minHeight: 50,
		fontSize: 20,
		marginRight: 60,
		margin: 15
	},
	hint_error: {
		marginTop: 10,
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 10
	},
	hint_error_text: {
		color: '#ff0000'
	},
	button_container: {
		flex: -1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 10,
		paddingRight: 10
	},
	button: {
		height: 30,
		borderRadius: 15,
		flex: -1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingRight: 15,
		paddingLeft: 10
	},
	button_cancel: {
		backgroundColor: 'grey',
		marginRight: 10
	},
	button_send: {
		backgroundColor: '#5e00ff'
	},

	button_text: {
		color: '#ffffff',
		textAlign: 'center',
		height: 30,
		lineHeight: 30,
		fontSize: 16,
		fontWeight: '500'
	},
	button_icon: {
		color: '#ffffff',
		textAlign: 'center',
		height: 30,
		lineHeight: 30,
		width: 30
	},
	button_success: {
		backgroundColor: 'blue'
	},
	disabled: {
		backgroundColor: 'grey'
	},
	action_indicator: {
		marginLeft: 'auto',
		marginRight: 10
	}
})

const mapStateToProps = (state, ownProps) => {
	const form = getFeedbackForm(state)
	const shoppingListId = ownProps.shoppingListId

	return {
		status: form.status,
		error: form.error,
		shoppingListId,
		style: ownProps.style
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		submit: (dto) => dispatch(feedbackFormSubmit(dto, locale)),
		reset: () => dispatch(feedbackFormReset())
	}
}

Feedback.propTypes = {
	onClose: PropTypes.func,
	submit: PropTypes.func,
	reset: PropTypes.func,
	className: PropTypes.string,
	status: PropTypes.string,
	error: PropTypes.string,
	i18n: PropTypes.object,
	style: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback)
