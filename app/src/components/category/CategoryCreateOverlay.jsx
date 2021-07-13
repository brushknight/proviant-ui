import * as React from 'react'
import { Overlay } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import CategoryCreateForm from './CategoryCreateForm'
import ProductsOverlayCloseButton from '../product/ProductOverlayCloseButton'
import PropTypes from 'prop-types'

const CategoryCreateOverlay = () => {
	const [isOpen, setIsOpen] = useState(false)
	const history = useHistory()

	useEffect(() => {
		setIsOpen(true)
	}, [])

	const onClose = () => {
		history.goBack()
		console.log('close overlay')
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
				<ProductsOverlayCloseButton onClick={closePopover}/>
				<CategoryCreateForm
					className={'product-overlay__inner product-overlay__inner--fixed'}
				/>
			</div>
		</Overlay>
	)
}

CategoryCreateOverlay.propTypes = {
	filterType: PropTypes.string
}

export default withTranslation('translations')(CategoryCreateOverlay)
