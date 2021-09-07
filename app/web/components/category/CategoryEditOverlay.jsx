import * as React from 'react'
import { Overlay } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import CategoryEditForm from './CategoryEditForm'
import OverlayCloseButton from '../generic/OverlayCloseButton'
import PropTypes from 'prop-types'

const CategoryEditOverlay = ({ filterType }) => {
	const { id, productId } = useParams()
	const [isOpen, setIsOpen] = useState(false)
	const history = useHistory()

	useEffect(() => {
		setIsOpen(true)
	}, [id, productId])

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
				<CategoryEditForm
					className={'product-overlay__inner product-overlay__inner--fixed'}
				/>
			</div>
		</Overlay>
	)
}

CategoryEditOverlay.propTypes = {
	filterType: PropTypes.string
}

export default withTranslation('translations')(CategoryEditOverlay)
