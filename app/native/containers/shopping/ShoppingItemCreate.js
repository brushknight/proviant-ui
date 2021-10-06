import { connect } from 'react-redux'
import { getShoppingForm, getShoppingList } from '../../../common/redux/selectors'
import { shoppingFormReset, shoppingFormSubmit } from '../../../common/redux/actions/shopping/form'
import { STATUS_CREATED, STATUS_DEFAULT, STATUS_ERROR, STATUS_SENDING } from '../../../common/redux/reducers/consts'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Counter from '../../components/shopping/Counter'
import Deeplink from '../utils/Deeplink'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const ShoppingItemCreate = ({ error, reset, status, submit, onClose, shoppingListId, style }) => {
	const [title, setTitle] = useState('')
	const [quantity, setQuantity] = useState('')
	const [submitTime, setSubmitTime] = useState(null)

	const emptyForm = () => {
		setTitle('')
		setQuantity(1)
		setSubmitTime(+(new Date()))
	}

	useEffect(() => {
		reset()
		emptyForm()
		if (status === STATUS_CREATED) {
			reset()
			emptyForm()
		}
	}, [status])

	const onSubmit = () => {
		submit(shoppingListId, {
			title,
			quantity
		})
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

	return (
		<View style={[style, styles.container]}>

			<Deeplink/>

			<TextInput
				placeholder={'Product title'}
				style={styles.title}
				onChangeText={setTitle}
				value={title}
				autoFocus={true}
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
					<Text style={styles.button_text}>Cancel</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.button_create]}
					onPress={onSubmit}
				>
					<Text style={styles.button_text}>Create</Text>
				</TouchableOpacity>

			</View>
		</View>
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
		backgroundColor: 'grey'
	},
	button_create: {
		backgroundColor: 'green'
	},
	button: {
		height: 30,
		width: 100,
		borderRadius: 15
	},
	button_text: {
		color: '#ffffff',
		textAlign: 'center',
		height: 30,
		lineHeight: 30,
		fontSize: 16,
		fontWeight: '500'
	},
	button_success: {
		backgroundColor: 'green'
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
