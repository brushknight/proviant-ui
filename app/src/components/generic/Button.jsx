import * as React from 'react'
import { Icon } from '@blueprintjs/core'
import PropTypes from 'prop-types'

const Button = (props) => {
	let icon

	if (props.icon) {
		icon = <Icon className={'button__icon'} iconSize={16} icon={props.icon}/>
	}

	return (
		<button disabled={props.disabled} type={props.type || 'button'} className={'button ' + props.className} onClick={props.onClick}>
			{icon}
			{props.text}
		</button>
	)
}

Button.propTypes = {
	text: PropTypes.string,
	onClick: PropTypes.func,
	className: PropTypes.string,
	icon: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool
}

export default Button
