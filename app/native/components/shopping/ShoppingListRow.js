import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import ShoppingListTick from './ShoppingListTick'

const ShoppingListRow = ({ item, onCheck, onUncheck, navigation }) => {
	const goToDetails = () => {
		navigation.navigate('shopping_item_update', { itemId: item.id })
	}

	return (
		<TouchableOpacity style={styles.container} onPress={goToDetails}>
			<Text style={[styles.title, item.checked ? styles.opacity_checked : null]}>{item.title}</Text>
			<Text style={[styles.quantity, item.checked ? styles.opacity_checked : null]}>{item.quantity}</Text>
			<ShoppingListTick isChecked={item.checked} onUncheck={onUncheck} onCheck={onCheck}/>
		</TouchableOpacity>
	)
}

ShoppingListRow.propTypes = {
	item: PropTypes.object,
	onCheck: PropTypes.func,
	onUncheck: PropTypes.func,
	navigation: PropTypes.object
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		borderBottomColor: 'gray',
		borderBottomWidth: 1
	},
	opacity_checked: {
		opacity: 0.2
	},
	title: {
		lineHeight: 50,
		paddingLeft: 10
	},
	quantity: {
		width: 35,
		position: 'absolute',
		right: 35,
		lineHeight: 50
	},
	tick: {
		borderRadius: 15,
		borderColor: 'purple',
		borderWidth: 5,
		width: 30,
		height: 30,
		position: 'absolute',
		right: 5,
		top: 10
	},
	tick_checked: {
		backgroundColor: 'purple'
	}
})

export default ShoppingListRow
