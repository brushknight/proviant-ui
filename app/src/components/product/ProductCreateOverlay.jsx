import * as React from 'react'
import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST } from '../../const'
import { generateCategoryLink, generateListLink } from '../../utils/link'
import { Overlay } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import ProductCreate from './ProductCreate'
import ProductsOverlayCloseButton from './ProductOverlayCloseButton'
import PropTypes from 'prop-types'

const ProductCreateOverlay = ({ filterType }) => {
	const { id, productId } = useParams()
	const [isOpen, setIsOpen] = useState(false)
	const history = useHistory()

	useEffect(() => {
		setIsOpen(true)
	}, [])

	const onClose = () => {
		switch (filterType) {
		case FILTER_TYPE_CATEGORY:
			history.push(generateCategoryLink(id))
			break
		case FILTER_TYPE_LIST:
			history.push(generateListLink(id))
			break
		default:
			history.push('/')
			break
		}
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
				<ProductCreate
					className={'product-overlay__inner product-overlay__inner--fixed'}
					productId={productId}
					closePopover={closePopover}
				/>
			</div>

		</Overlay>
	)
}

ProductCreateOverlay.propTypes = {
	filterType: PropTypes.string
}

export default withTranslation('translations')(ProductCreateOverlay)
