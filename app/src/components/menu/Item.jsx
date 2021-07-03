import * as React from 'react'
import { Button, Icon, MenuItem } from '@blueprintjs/core'
import PropTypes from 'prop-types'

const Item = (props) => {
	let button

	if (props.button) {
		const onClick = (e) => {
			e.stopPropagation()
			props.button.action()
		}
		button = (
			<Button small={true} minimal={true}>
				<Icon onClick={onClick} icon={props.button.icon}/>
			</Button>
		)
	}

	return (
		<MenuItem
			icon="dot"
			key={props.key}
			text={props.text}
			labelElement={button}
			onClick={props.onClick}
		/>
	)
}

Item.propTypes = {
	key: PropTypes.string,
	text: PropTypes.string,
	button: PropTypes.object,
	onClick: PropTypes.func
}

export default Item
