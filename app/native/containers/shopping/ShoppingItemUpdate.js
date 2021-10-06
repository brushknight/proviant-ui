import { connect } from 'react-redux'
import { getShoppingList, getShoppingListEdit, getShoppingListItem } from '../../../common/redux/selectors'
import { shoppingItemDelete } from '../../../common/redux/actions/shopping/delete'
import { shoppingItemUpdate, shoppingListItemReset } from '../../../common/redux/actions/shopping/edit'
import { shoppingListItemCheck, shoppingListItemUncheck } from '../../../common/redux/actions/shopping/tick'
import {
	STATUS_DEFAULT,
	STATUS_DELETED,
	STATUS_ERROR,
	STATUS_SENDING,
	STATUS_UPDATED
} from '../../../common/redux/reducers/consts'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Counter from '../../components/shopping/Counter'
import Deeplink from '../utils/Deeplink'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ShoppingListTick from '../../components/shopping/ShoppingListTick'

const ShoppingItemUpdate = (
	{
		item,
		reset,
		error,
		status,
		checkItem,
		uncheckItem,
		updateItem,
		navigation,
		deleteItem,
		shoppingListId,
		style,
		onClose
	}) => {
	const [title, setTitle] = useState('')
	const [quantity, setQuantity] = useState('')
	const [submitTime, setSubmitTime] = useState(null)

	const emptyForm = () => {
		setTitle('')
		setQuantity(1)
		setSubmitTime(+(new Date()))
	}

	useEffect(() => {
		if (status === STATUS_DEFAULT) {
			reset()
			emptyForm()
			setTitle(item.title)
			setQuantity(item.quantity)
		}

		if (status === STATUS_DELETED || !item) {
			reset()
			onClose()
		}
	}, [status])

	if (status === STATUS_DELETED || !item) {
		return (<View/>)
	}

	const onCheck = () => {
		checkItem(shoppingListId, item.id)
	}
	const onUncheck = () => {
		uncheckItem(shoppingListId, item.id)
	}

	const onSubmit = () => {
		updateItem(shoppingListId, item.id, {
			title,
			quantity,
			checked: item.checked
		})
	}

	const onDelete = () => {
		deleteItem(shoppingListId, item.id)
	}

	if (status === STATUS_DEFAULT || status === STATUS_ERROR) {

	}

	if (status === STATUS_SENDING) {

	}

	if (status === STATUS_UPDATED) {
		reset()
		onClose()
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
			<ShoppingListTick
				onCheck={onCheck}
				onUncheck={onUncheck}
				isChecked={item.checked}
				extraStyles={styles.tick}
			/>

			<Counter
				defaultValue={item.quantity}
				onChange={setQuantity}
				resetTime={submitTime}
			/>

			{errorJsx}
			<View style={styles.button_container}>

				<TouchableOpacity
					style={[styles.button, styles.button_delete]}
					onPress={onDelete}
				>
					<Icon name={'trash'} size={20} style={styles.button_icon}/>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.button_cancel]}
					onPress={onClose}
				>
					<Icon name={'times'} size={20} style={styles.button_icon}/>
					<Text style={styles.button_text}>Cancel</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.button_save]}
					onPress={onSubmit}
				>
					<Icon name={'check'} size={20} style={styles.button_icon}/>
					<Text style={styles.button_text}>Save</Text>
				</TouchableOpacity>

			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		// minHeight: 150
	},
	tick: {
		width: 40,
		height: 40,
		borderRadius: 20,
		position: 'absolute',
		right: 10,
		top: 20
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
	button_delete: {
		backgroundColor: 'red',
		width: 60,
		justifyContent: 'center'
	},
	button_save: {
		paddingLeft: 7,
		backgroundColor: 'green'
	},
	button_cancel: {
		backgroundColor: 'grey',
		marginLeft: 'auto',
		marginRight: 5,
		width: 120,
		paddingLeft: 10
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
	}

})

const mapStateToProps = (state, ownProps) => {
	const shoppingList = getShoppingList(state)
	const shoppingListEdit = getShoppingListEdit(state)
	const shoppingListItem = getShoppingListItem(state, ownProps.itemId)
	const shoppingListId = ownProps.shoppingListId
	return {
		model: shoppingList.model,
		item: shoppingListItem,
		fetchStatus: shoppingList.status,
		fetchError: shoppingList.error,
		status: shoppingListEdit.status,
		error: shoppingListEdit.error,
		id: ownProps.itemId,
		listId: ownProps.listId,
		style: ownProps.style,
		onClose: ownProps.onClose,
		shoppingListId
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		checkItem: (listId, id) => dispatch(shoppingListItemCheck(listId, id, locale)),
		uncheckItem: (listId, id) => dispatch(shoppingListItemUncheck(listId, id, locale)),
		updateItem: (listId, id, dto) => dispatch(shoppingItemUpdate(listId, id, dto, locale)),
		deleteItem: (listId, id) => dispatch(shoppingItemDelete(listId, id, locale)),
		reset: () => dispatch(shoppingListItemReset())
	}
}

ShoppingItemUpdate.propTypes = {
	navigation: PropTypes.object,
	item: PropTypes.object,
	itemId: PropTypes.number,
	updateItem: PropTypes.func,
	deleteItem: PropTypes.func,
	reset: PropTypes.func,
	closePopover: PropTypes.func,
	className: PropTypes.string,
	i18n: PropTypes.object,
	status: PropTypes.string,
	checkItem: PropTypes.func,
	uncheckItem: PropTypes.func,
	error: PropTypes.string,
	shoppingListId: PropTypes.number,
	onClose: PropTypes.func,
	style: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingItemUpdate)
