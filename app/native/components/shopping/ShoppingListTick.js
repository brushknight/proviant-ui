import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import React from 'react'
import {COLOR_ACCENT} from "../../const";

const ShoppingListTick = ({ isChecked, onCheck, onUncheck, extraStyles, size }) => {
	const onTick = () => {
		if (isChecked) {
			onUncheck()
		} else {
			onCheck()
		}
	}

	let tickStyle = styles.tick

	if (isChecked) {
		tickStyle = {
			...tickStyle,
			backgroundColor: 'rgba(128,0,128,0.1)',
			borderColor: 'rgba(128,0,128,0.1)'
		}
	}

	if (size > 0) {
		tickStyle.height = size
		tickStyle.width = size
		tickStyle.borderRadius = size / 2
	}

	const iconStyle = {
		...styles.icon,
		height: tickStyle.height - 6,
		lineHeight: tickStyle.height - 6,
		width: tickStyle.width - 6
	}

	iconStyle.height = tickStyle.height - 6
	iconStyle.lineHeight = tickStyle.height - 6
	iconStyle.width = tickStyle.width - 6

	return (
		<TouchableOpacity style={[tickStyle, extraStyles]} onPress={onTick}>
			<Icon name={'check'} size={20} style={[iconStyle, isChecked ? styles.icon_checked : null]}/>
		</TouchableOpacity>
	)
}

ShoppingListTick.propTypes = {
	isChecked: PropTypes.bool,
	onCheck: PropTypes.func,
	onUncheck: PropTypes.func,
	extraStyles: PropTypes.object,
	size: PropTypes.number
}

const styles = {
	tick: {
		borderRadius: 15,
		borderColor: COLOR_ACCENT,
		borderWidth: 3,
		width: 30,
		height: 30,
		opacity: 1
	},
	icon: {
		textAlign: 'center',
		color: COLOR_ACCENT,
		opacity: 0.2
	},
	icon_checked: {
		opacity: 0.8
	}
}

export default ShoppingListTick
