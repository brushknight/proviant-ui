import { FloatingAction } from 'react-native-floating-action'
import React from 'react'

const AddButton = ({ navigation }) => {
	const actions = [
		{
			text: 'Shopping Item',
			// icon: require('./images/ic_accessibility_white.png'),
			name: 'shopping_item_create',
			position: 2,
			color: 'purple'
		},
		{
			text: 'Product',
			// icon: require('./images/ic_accessibility_white.png'),
			name: 'product',
			position: 1,
			color: 'purple'
		}
	]

	return (
		<FloatingAction
			actions={actions}
			onPressItem={name => {
				console.log(`selected button: ${name}`)
				navigation.navigate(name)
			}}
			color={'purple'}
		/>
	)
}

export default AddButton
