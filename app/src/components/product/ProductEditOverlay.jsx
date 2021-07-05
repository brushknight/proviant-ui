import * as React from 'react'
import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST, FILTER_TYPE_NONE } from '../../const'
import { generateProductLink } from '../../utils/link'
import { Overlay } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ProductEdit from './ProductEdit'
import PropTypes from 'prop-types'

const ProductEditOverlay = ({ filterType }) => {
	const { id, productId } = useParams()
	const [isOpen, setIsOpen] = useState(false)
	const history = useHistory()

	useEffect(() => {
		setIsOpen(true)
	}, [id, productId])

	const onClose = () => {
		history.push(generateProductLink(filterType, id, productId))
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
			<div className={'change_me-overlay-product-container'}>
				<div className={'change_me-overlay-product-container-inner'}>
					<ProductEdit
						productId={productId}
						closePopover={closePopover}
					/>

				</div>
			</div>

		</Overlay>
	)
}

ProductEditOverlay.propTypes = {
	filterType: PropTypes.string
}

export default ProductEditOverlay
