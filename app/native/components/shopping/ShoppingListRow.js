import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'

const ShoppingListRow = ({ item, onCheck, onUncheck }) => {
	const onTick = () => {
		if (item.checked) {
			onUncheck()
		} else {
			onCheck()
		}
	}

	return (
		<View style={[styles.container, item.checked ? styles.container_checked : null]}>
			<Text style={styles.title}>{item.title}</Text>
			<Text style={styles.quantity}>{item.quantity}</Text>
			<TouchableOpacity style={[styles.tick, item.checked ? styles.tick_checked : null]} onPress={onTick}/>
		</View>
	)
}

ShoppingListRow.propTypes = {
	item: PropTypes.object,
	onCheck: PropTypes.func,
	onUncheck: PropTypes.func
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		borderBottomColor: 'gray',
		borderBottomWidth: 1
	},
	container_checked: {
		opacity: 0.5
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
