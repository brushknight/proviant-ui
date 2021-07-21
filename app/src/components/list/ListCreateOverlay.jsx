import * as React from 'react'
import { Overlay } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import ListCreateForm from './ListCreateForm'
import OverlayCloseButton from '../generic/OverlayCloseButton'

const ListCreateOverlay = () => {
	const [isOpen, setIsOpen] = useState(false)
	const history = useHistory()

	useEffect(() => {
		setIsOpen(true)
	}, [])

	const onClose = () => {
		history.goBack()
	}

	const closePopover = () => {
		setIsOpen(false)
		onClose()
	}

	return (
		<Overlay
			isOpen={isOpen}
			onClose={() => {
				onClose()
			}}
		>
			<div className={'product-overlay'}>
				<OverlayCloseButton onClick={closePopover}/>
				<ListCreateForm
					className={'product-overlay__inner product-overlay__inner--fixed'}
				/>
			</div>
		</Overlay>
	)
}

export default withTranslation('translations')(ListCreateOverlay)
