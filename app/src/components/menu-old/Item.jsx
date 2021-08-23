import * as React from 'react'
import { Button, Icon } from '@blueprintjs/core'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const Item = (props) => {
	let button

	if (props.button) {
		const onClick = (e) => {
			e.stopPropagation()
			props.button.action()
		}
		button = (
			<Button onClick={onClick} className={'menu__item-button'} small={true} minimal={true}>
				<Icon icon={props.button.icon}/>
			</Button>
		)
	}

	let className = 'menu__item'

	if (props.isActive) {
		className += ' menu__item--active'
	}

	return (
		<li onClick={props.onClick} className={className} key={props.key}>
			{props.text}
			{button}
		</li>
	)
}

Item.propTypes = {
	key: PropTypes.string,
	text: PropTypes.string,
	button: PropTypes.object,
	onClick: PropTypes.func,
	isActive: PropTypes.bool,
	i18n: PropTypes.object
}

export default withTranslation('translations')(Item)
