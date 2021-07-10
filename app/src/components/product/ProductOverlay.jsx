import * as React from 'react'
import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST, FILTER_TYPE_NONE } from '../../const'
import { Icon, Overlay } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
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
		case FILTER_TYPE_NONE:
			history.push('/')
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
			<section className={'product-overlay'}>
				<button className='product-overlay__button-back' onClick={closePopover}>
					<Icon iconSize={32} icon={'cross'}/>
				</button>
				<Product
					className={'product-overlay__inner'}
					closePopover={closePopover}
					filterType={filterType}
				/>
			</section>
		</Overlay>
	)
}

ProductOverlay.propTypes = {
	filterType: PropTypes.string
}

export default withTranslation('translations')(ProductOverlay)
