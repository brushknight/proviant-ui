import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createProductFormReset } from '../../../common/redux/actions/product/createProduct'
import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST } from '../../const'
import { generateCategoryLink, generateListLink } from '../../../common/utils/link'
import { Overlay } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import OverlayCloseButton from '../generic/OverlayCloseButton'
import ProductCreate from './ProductCreate'
import PropTypes from 'prop-types'

const ProductCreateOverlay = ({ filterType, reset }) => {
	const { id, productId } = useParams()
	const [isOpen, setIsOpen] = useState(false)
	const history = useHistory()

	useEffect(() => {
		setIsOpen(true)
	}, [])

	const onClose = () => {
		reset()
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
				<OverlayCloseButton onClick={closePopover}/>
				<ProductCreate
					className={'product-overlay__inner product-overlay__inner--fixed'}
					productId={productId}
					closePopover={closePopover}
					filterType={filterType}
					listOrCategoryId={id}
				/>
			</div>

		</Overlay>
	)
}

ProductCreateOverlay.propTypes = {
	filterType: PropTypes.string,
	reset: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		reset: () => dispatch(createProductFormReset(locale))
	}
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ProductCreateOverlay)
