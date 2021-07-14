import * as React from 'react'
import { Overlay } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import CategoryCreateForm from './CategoryCreateForm'
import ProductsOverlayCloseButton from '../product/ProductOverlayCloseButton'

const CategoryCreateOverlay = () => {
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
				<ProductsOverlayCloseButton onClick={closePopover}/>
				<CategoryCreateForm
					className={'product-overlay__inner product-overlay__inner--fixed'}
				/>
			</div>
		</Overlay>
	)
}

export default withTranslation('translations')(CategoryCreateOverlay)
