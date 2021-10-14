import { connect } from 'react-redux'
import { getShoppingForm, getShoppingList } from '../../../common/redux/selectors'
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { shoppingFormReset, shoppingFormSubmit } from '../../../common/redux/actions/shopping/form'
import { STATUS_CREATED, STATUS_DEFAULT, STATUS_ERROR, STATUS_SENDING } from '../../../common/redux/reducers/consts'
import Counter from '../../components/shopping/Counter'
import Deeplink from '../utils/Deeplink'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const ShoppingItemCreate = ({ error, reset, status, submit, onClose, shoppingListId, style }) => {
	const [title, setTitle] = useState('')
	const [quantity, setQuantity] = useState('')
	const [submitTime, setSubmitTime] = useState(null)
	const [isValid, setIsValid] = useState(false)

	const emptyForm = () => {
		setTitle('')
		setQuantity(1)
		setSubmitTime(+(new Date()))
	}

	useEffect(() => {
		if (status === STATUS_CREATED) {
			reset()
			emptyForm()
		}

		if (title !== '' && quantity > 0) {
			setIsValid(true)
		} else {
			setIsValid(false)
		}
	}, [status, title, quantity])

	const onSubmit = () => {
		if (isValid) {
			submit(shoppingListId, {
				title,
				quantity
			})
		}
	}

	if (status === STATUS_DEFAULT || status === STATUS_ERROR) {

	}

	if (status === STATUS_SENDING) {

	}

	let errorJsx = []

	if (status === STATUS_ERROR) {
		errorJsx = (
			<View style={styles.hint_error}>
				<Text>
					{error}
				</Text>
			</View>
		)
	}

	console.log('title', title)
	console.log('quantity', quantity)

	console.log('isValid', isValid)

	return (
		<TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={[style, styles.container]}>

			<Deeplink/>

			<TextInput
				placeholder={'Product title'}
				style={styles.title}
				onChangeText={setTitle}
				value={title}
				autoFocus={true}
				placeholderTextColor="grey"
			/>

			<Counter
				defaultValue={1}
				onChange={setQuantity}
				resetTime={submitTime}
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

				<TouchableOpacity
					style={[styles.button, styles.button_create, isValid ? null : styles.disabled]}
					onPress={onSubmit}
				>
					<Icon name={'arrow-up'} size={20} style={styles.button_icon}/>
					<Text style={styles.button_text}>Save</Text>
				</TouchableOpacity>

			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		// minHeight: 150
	},
	title: {
		height: 50,
		fontSize: 20,
		marginRight: 60,
		marginTop: 15,
		paddingLeft: 15
	},
	hint_error: {
		marginTop: 10,
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 10,
		color: '#ff0000'
	},
	button_container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 10,
		paddingRight: 10
	},
	button_cancel: {
		backgroundColor: 'grey',
		marginRight: 5,
		width: 120,
		paddingLeft: 10
	},
	button_create: {
		paddingLeft: 7,
		backgroundColor: 'green'
	},
	button: {
		height: 30,
		width: 100,
		borderRadius: 15,
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	button_text: {
		color: '#ffffff',
		textAlign: 'center',
		height: 30,
		lineHeight: 30,
		fontSize: 16,
		fontWeight: '500',
		paddingLeft: 10
	},
	button_icon: {
		color: '#ffffff',
		textAlign: 'center',
		height: 30,
		lineHeight: 30,
		width: 30
	},
	button_success: {
		backgroundColor: 'green'
	},
	disabled: {
		backgroundColor: 'grey'
	}
})

const mapStateToProps = (state, ownProps) => {
	const shoppingList = getShoppingList(state)
	const form = getShoppingForm(state)
	const shoppingListId = ownProps.shoppingListId

	return {
		fetchStatus: shoppingList.status,
		fetchError: shoppingList.error,
		status: form.status,
		error: form.error,
		shoppingListId,
		style: ownProps.style
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		submit: (listId, dto) => dispatch(shoppingFormSubmit(listId, dto, locale)),
		reset: () => dispatch(shoppingFormReset())
	}
}

ShoppingItemCreate.propTypes = {
	onClose: PropTypes.func,
	submit: PropTypes.func,
	reset: PropTypes.func,
	className: PropTypes.string,
	status: PropTypes.string,
	error: PropTypes.string,
	i18n: PropTypes.object,
	shoppingListId: PropTypes.number,
	style: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingItemCreate)
