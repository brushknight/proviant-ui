import { FloatingAction } from 'react-native-floating-action'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import React from 'react'

const MoreButton = ({ actionHandlers }) => {
	const actions = [
		// {
		// 	text: 'Shopping Item',
		// 	icon: require('../../assets/icons/shopping-cart.png'),
		// 	name: 'shopping_item_create',
		// 	position: 2,
		// 	color: 'purple'
		// },
		{
			text: 'Feedback',
			icon: <Icon name={'question'} size={30}/>,
			name: 'feedback',
			position: 1,
			color: 'orange'
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
			color={'white'}
			position={'left'}
			floatingIcon={<Icon name={'ellipsis-h'} size={30}/>}
			overrideWithAction={true}

		/>
	)
}

MoreButton.propTypes = {
	actionHandlers: PropTypes.object
}

export default MoreButton
