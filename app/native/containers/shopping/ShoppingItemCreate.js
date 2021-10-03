import { Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { getShoppingForm, getShoppingList } from '../../../common/redux/selectors'
import { shoppingFormReset, shoppingFormSubmit } from '../../../common/redux/actions/shopping/form'
import { STATUS_CREATED, STATUS_DEFAULT, STATUS_SENDING } from '../../../common/redux/reducers/consts'
import { StyleSheet, View } from 'react-native'
import Deeplink from '../utils/Deeplink'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const ShoppingItemCreate = ({ error, reset, status, submit, navigation }) => {
	const shoppingListId = 3

	const [title, setTitle] = useState('')
	const [quantity, setQuantity] = useState('')

	const emptyForm = () => {
		setTitle('')
		setQuantity(1)
	}

	useEffect(() => {
		reset()
		emptyForm()
	}, [])

	const onSubmit = () => {
		submit(shoppingListId, {
			title,
			quantity
		})
	}

	let buttonSave = []

	console.log(status, error)

	if (status === STATUS_DEFAULT) {
		buttonSave = (
			<Button
				buttonStyle={styles.button}
				title="Save"
				icon={
					<Icon style={{ marginRight: 10 }} name="save" size={15} color="white"/>
				}
				iconPosition={'left'}
				onPress={onSubmit}
			/>
		)
	}

	if (status === STATUS_SENDING) {
		buttonSave = (
			<Button
				buttonStyle={styles.button}
				loading={true}
				disabled={true}
			/>
		)
	}

	if (status === STATUS_CREATED) {
		buttonSave = (
			<Button
				title="Created"
				buttonStyle={[styles.button, styles.button_success]}
				icon={
					<Icon style={{ marginRight: 10 }} name="check" size={15} color="white"/>
				}
				iconPosition={'left'}
				onPress={onSubmit}
			/>
		)
		navigation.goBack()
		reset()
	}

	return (
		<View>
			<Deeplink/>
			<Input
				placeholder={'Product title'}
				style={styles.title}
				onChangeText={setTitle}
				value={title}
				autoFocus={true}
			/>

			<Input
				placeholder="Quantity"
				leftIcon={{ type: 'font-awesome', name: 'shopping-basket' }}
				value={String(quantity)}
				keyboardType={'numeric'}
				onChangeText={value => {
					if (value === '' || isNaN(Number(value))) {
						setQuantity('')
					} else {
						setQuantity(Number(value))
					}
				}}

			/>
			{buttonSave}

		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		height: 50,
		fontSize: 20,
		marginRight: 60,
		marginTop: 15
	},
	button: {
		marginRight: 10,
		marginLeft: 10
	},
	button_success: {
		backgroundColor: 'green'
	}
})

const mapStateToProps = (state, ownProps) => {
	const shoppingList = getShoppingList(state)
	const form = getShoppingForm(state)

	return {
		fetchStatus: shoppingList.status,
		fetchError: shoppingList.error,
		status: form.status,
		error: form.error
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
	navigation: PropTypes.object,
	submit: PropTypes.func,
	reset: PropTypes.func,
	className: PropTypes.string,
	status: PropTypes.string,
	error: PropTypes.string,
	i18n: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingItemCreate)
