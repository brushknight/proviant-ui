import { FloatingAction } from 'react-native-floating-action'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import React from 'react'

const MoreButton = ({ actionHandlers }) => {
	const actions = [
		{
			text: 'Отправить отзыв',
			icon: <Icon name={'question'} size={30}/>,
			name: 'feedback',
			position: 1,
			color: 'white'
		},
		{
			text: 'Настройки списка',
			icon: <Icon name={'cog'} size={20}/>,
			name: 'list_settings',
			position: 2,
			color: 'white'
		}
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
			// overrideWithAction={true}

		/>
	)
}

MoreButton.propTypes = {
	actionHandlers: PropTypes.object
}

export default MoreButton
