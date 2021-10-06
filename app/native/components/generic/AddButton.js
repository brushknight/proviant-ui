import { FloatingAction } from 'react-native-floating-action'
import PropTypes from 'prop-types'
import React from 'react'

const AddButton = ({ actionHandlers }) => {
	const actions = [
		{
			text: 'Shopping Item',
			icon: require('../../assets/icons/shopping-cart.png'),
			name: 'shopping_item_create',
			position: 2,
			color: 'purple'
		}
		// {
		// 	text: 'Product',
		// 	icon: require('../../assets/icons/lemon.png'),
		// 	name: 'product',
		// 	position: 1,
		// 	color: 'purple'
		// }
	]

	return (
		<FloatingAction
			actions={actions}
			onPressItem={name => {
				if (actionHandlers[name]) {
					actionHandlers[name]()
				}
			}}
			color={'purple'}
		/>
	)
}

AddButton.propTypes = {
	actionHandlers: PropTypes.object
}

export default AddButton
