import { StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'

const ShoppingListRow = ({ isChecked, onCheck, onUncheck, extraStyles }) => {
	const onTick = () => {
		if (isChecked) {
			onUncheck()
		} else {
			onCheck()
		}
	}

	return (
		<TouchableOpacity style={[styles.tick, isChecked ? styles.tick_checked : null, extraStyles]} onPress={onTick}/>
	)
}

ShoppingListRow.propTypes = {
	isChecked: PropTypes.bool,
	onCheck: PropTypes.func,
	onUncheck: PropTypes.func
}

const styles = StyleSheet.create({
	tick: {
		borderRadius: 15,
		borderColor: 'purple',
		borderWidth: 3,
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
