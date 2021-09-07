import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { editProductFormReset } from '../../redux/actions/editProduct'
import { generateProductLink } from '../../utils/link'
import { Overlay } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import OverlayCloseButton from '../generic/OverlayCloseButton'
import ProductEdit from './ProductEdit'
import PropTypes from 'prop-types'

const ProductEditOverlay = ({ filterType, reset }) => {
	const { id, productId } = useParams()
	const [isOpen, setIsOpen] = useState(false)
	const history = useHistory()

	useEffect(() => {
		setIsOpen(true)
	}, [id, productId])

	const onClose = () => {
		history.push(generateProductLink(filterType, id, productId))
		reset()
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
	filterType: PropTypes.string,
	reset: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		reset: () => dispatch(editProductFormReset(locale))
	}
}

ProductEdit.propTypes = {
	fetchProduct: PropTypes.func,
	updateProduct: PropTypes.func,
	reset: PropTypes.func,
	productId: PropTypes.string,
	form: PropTypes.object,
	lists: PropTypes.object,
	categories: PropTypes.object,
	t: PropTypes.func,
	className: PropTypes.string,
	closePopover: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ProductEditOverlay)
