import { Text, View } from 'react-native'
import React from 'react'

const ShoppingListRow = ({ item }) => {
	return (
		<View>
			<Text>{item.title}</Text>
			<Text>{item.quantity}</Text>
		</View>
	)
}

export default ShoppingListRow
