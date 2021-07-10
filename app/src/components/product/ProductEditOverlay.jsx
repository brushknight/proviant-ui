import * as React from 'react'
import { generateProductLink } from '../../utils/link'
import { Icon, Overlay } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
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
			<div className={'product-overlay'}>
				<button className='product-overlay__button-back' onClick={closePopover}>
					<Icon iconSize={32} icon={'cross'}/>
				</button>
				<ProductEdit
					className={'product-overlay__inner product-overlay__inner--fixed'}
					productId={productId}
					closePopover={closePopover}
				/>
			</div>
		</Overlay>
	)
}

ProductEditOverlay.propTypes = {
	filterType: PropTypes.string
}

export default withTranslation('translations')(ProductEditOverlay)
