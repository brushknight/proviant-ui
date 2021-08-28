import * as React from 'react'
import { Overlay } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import CreateShoppingListItem from './CreateShoppingListItem'
import OverlayCloseButton from '../generic/OverlayCloseButton'
import PropTypes from 'prop-types'

const CreateShoppingListItemOverlay = ({ filterType }) => {
	const { id } = useParams()
	const [isOpen, setIsOpen] = useState(false)
	const history = useHistory()

	useEffect(() => {
		setIsOpen(true)
	}, [])

	const onClose = () => {
		history.push('/shopping/' + id)
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
				<CreateShoppingListItem
					listId={id}
					className={'product-overlay__inner product-overlay__inner--fixed'}
					closePopover={closePopover}
				/>
			</div>

		</Overlay>
	)
}

CreateShoppingListItemOverlay.propTypes = {
	filterType: PropTypes.string
}

export default withTranslation('translations')(CreateShoppingListItemOverlay)
