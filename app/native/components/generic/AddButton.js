import { FloatingAction } from 'react-native-floating-action'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import React from 'react'

const AddButton = ({ actionHandlers }) => {
	const actions = [
		{
			text: 'Shopping Item',
			icon: require('../../assets/icons/plus.png'),
			name: 'shopping_item_create',
			position: 2
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
			overrideWithAction={true}
			color={'purple'}
			iconWidth={30}
			iconHeight={30}
		/>
	)
}

AddButton.propTypes = {
	actionHandlers: PropTypes.object
}

export default AddButton
