import './button.less'
import * as React from 'react'
import { Icon } from '@blueprintjs/core'
import PropTypes from 'prop-types'

const Button = (props) => {
	let icon

	if (props.icon) {
		icon = <Icon className={'change_me-button__icon'} iconSize={16} icon={props.icon}/>
	}

	return (
		<button className={'change_me-button ' + props.className} onClick={props.onClick}>
			{icon}
			{props.text}
		</button>
	)
}

Button.propTypes = {
	text: PropTypes.string,
	onClick: PropTypes.func,
	className: PropTypes.string,
	icon: PropTypes.string
}

export default Button
