import { StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'

const ShoppingListTick = ({ isChecked, onCheck, onUncheck, extraStyles }) => {
	const onTick = () => {
		if (isChecked) {
			onUncheck()
		} else {
			onCheck()
		}
	}

	let style = styles.tick

	if (isChecked) {
		style = {
			...style,
			backgroundColor: 'rgba(128,0,128,0.1)',
			borderColor: 'rgba(128,0,128,0.1)'
		}
	}

	return (
		<TouchableOpacity style={style} onPress={onTick}/>
	)
}

ShoppingListTick.propTypes = {
	isChecked: PropTypes.bool,
	onCheck: PropTypes.func,
	onUncheck: PropTypes.func,
	extraStyles: PropTypes.object
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
		top: 10,
		opacity: 1
	}
})

export default ShoppingListTick
