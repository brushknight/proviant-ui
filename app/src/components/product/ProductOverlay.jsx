import * as React from 'react'
import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST } from '../../const'
import { Overlay } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Product from './Product'
import PropTypes from 'prop-types'

const ProductOverlay = ({ filterType }) => {
	const { id, productId } = useParams()
	const [isOpen, setIsOpen] = useState(false)
	const history = useHistory()

	useEffect(() => {
		setIsOpen(true)
	}, [id, productId])

	const onClose = () => {
		switch (filterType) {
		case FILTER_TYPE_LIST:
			history.push('/list/' + id)
			break
		case FILTER_TYPE_CATEGORY:
			history.push('/category/' + id)
			break
		default:
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
			<div className={'change_me-overlay-product-container'}>
				<div className={'change_me-overlay-product-container-inner'}>
					<Product closePopover={closePopover}/>

				</div>
			</div>

		</Overlay>
	)
}

ProductOverlay.propTypes = {
	filterType: PropTypes.string
}

export default ProductOverlay
