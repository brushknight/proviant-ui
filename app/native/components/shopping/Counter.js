import { TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const Counter = ({ onChange, defaultValue, resetTime }) => {
	const [quantity, setQuantity] = useState(String(defaultValue))

	const updateValue = (value) => {
		onChange(value)
		setQuantity(value)
	}

	useEffect(() => {
		updateValue(defaultValue)
	},
	[resetTime])

	const addOne = () => {
		updateValue(Number(quantity) + 1)
	}

	const minusOne = () => {
		if (Number(quantity) - 1 < 1) {
			updateValue(defaultValue)
		} else {
			updateValue(Number(quantity) - 1)
		}
	}

	return (
		<View style={styles.quantity_container}>
			<TouchableOpacity style={[styles.quantity_minus]} onPress={minusOne}>
				<Icon name={'minus'} size={20} style={styles.quantity_minus_text}/>
			</TouchableOpacity>
			<TextInput
				placeholder={'Quantity'}
				style={styles.quantity}
				keyboardType={'numeric'}
				onChangeText={value => {
					if (value === '' || isNaN(Number(value))) {
						updateValue('')
					} else {
						updateValue(Number(value))
					}
				}}
				value={String(quantity)}
			/>
			<TouchableOpacity style={[styles.quantity_plus]} onPress={addOne}>
				<Icon name={'plus'} size={20} style={styles.quantity_plus_text}/>
			</TouchableOpacity>
		</View>
	)
}

Counter.propTypes = {
	onChange: PropTypes.func,
	resetTime: PropTypes.number,
	defaultValue: PropTypes.any
}

const styles = {
	quantity_container: {
		backgroundColor: '#d3d3d3',
		flex: 0,
		flexDirection: 'row',
		width: 150,
		marginBottom: 20,
		justifyContent: 'space-between',
		borderRadius: 20,
		marginLeft: 10
	},
	quantity: {
		height: 40,
		width: 40,
		textAlign: 'center',
		flexGrow: 1,
		fontSize: 22
	},
	quantity_minus: {
		height: 40,
		width: 40,
		backgroundColor: 'grey',
		borderRadius: 20
	},
	quantity_plus: {
		height: 40,
		width: 40,
		backgroundColor: 'grey',
		borderRadius: 20
	},
	quantity_minus_text: {
		lineHeight: 40,
		height: 40,
		textAlign: 'center',
		color: '#ffffff'
	},
	quantity_plus_text: {
		lineHeight: 40,
		height: 40,
		textAlign: 'center',
		color: '#ffffff'
	}
}

export default Counter
