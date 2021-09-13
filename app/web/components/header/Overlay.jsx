import * as React from 'react'
import { EVENT_NAVIGATION_OVERLAY_CLOCKED, publish } from '../../../common/utils/pubsub'

const Overlay = ({ isOpen }) => {
	let isOpenStyle = {}
	if (isOpen) {
		isOpenStyle = {
			display: 'block'
		}
	}

	const onClick = () => {
		publish(EVENT_NAVIGATION_OVERLAY_CLOCKED, null)
	}

	return (
		<div
			style={isOpenStyle}
			className={'navigation-overlay'}
			onClick={onClick}
		/>
	)
}

export default Overlay
