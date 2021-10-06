import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import ShoppingListTick from './ShoppingListTick'

const ShoppingListRow = ({ item, onCheck, onUncheck, onClick }) => {
	const goToDetails = () => {
		onClick()
	}

	return (
		<TouchableOpacity style={[styles.container, item.checked ? styles.container_checked : null]} onPress={goToDetails}>
			<Text style={[styles.title, item.checked ? styles.opacity_checked : null]}>{item.title}</Text>
			<Text style={[styles.quantity, item.checked ? styles.opacity_checked : null]}>{item.quantity}</Text>
			<ShoppingListTick isChecked={item.checked} onUncheck={onUncheck} onCheck={onCheck} extraStyles={styles.tick}/>
		</TouchableOpacity>
	)
}

ShoppingListRow.propTypes = {
	item: PropTypes.object,
	onCheck: PropTypes.func,
	onUncheck: PropTypes.func,
	onClick: PropTypes.func
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		borderBottomColor: 'gray',
		borderBottomWidth: 1
	},
	container_checked: {
		borderBottomColor: '#e0e0e0'
	},
	opacity_checked: {
		opacity: 0.2
	},
	title: {
		lineHeight: 50,
		paddingLeft: 10
	},
	quantity: {
		minWidth: 35,
		paddingRight: 10,
		textAlign: 'right',
		fontWeight: 'bold',
		position: 'absolute',
		right: 35,
		lineHeight: 50
	},
	tick: {
		position: 'absolute',
		right: 5,
		top: 10
	},
	tick_checked: {
		backgroundColor: 'purple'
	}
})

export default ShoppingListRow
