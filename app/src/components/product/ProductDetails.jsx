import * as React from 'react'
import { Button, ButtonGroup, Callout, Icon, Intent, NonIdealState, Spinner } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { deleteProduct, fetchProduct, resetProduct } from '../../redux/actions/product'
import { getProduct } from '../../redux/selectors'
import { STATUS_ERROR, STATUS_LOADING, STATUS_NOT_FOUND, STATUS_SUCCESS } from '../../redux/reducers/consts'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { compose } from 'redux'
import { generateEditProductLink } from '../../utils/link'
import { textToBase64Barcode } from '../../utils/barcode'
import { withTranslation } from 'react-i18next'
import ProductsTags from './ProductTags'
import PropTypes from 'prop-types'

const ProductDetails = ({
	productId,
	product,
	filterType,
	listOrCategoryId,
	fetchProduct,
	deleteProduct,
	reset,
	closePopover,
	t
}) => {
	const history = useHistory()

	useEffect(() => {
		fetchProduct(productId)
	}, [productId])

	if (product.deleteStatus === STATUS_SUCCESS) {
		reset()
		history.push('/')
	}

	if (product.status === STATUS_LOADING) {
		return <section>
			<Spinner/>
		</section>
	}

	if (product.status === STATUS_ERROR) {
		return <section>
			<Callout title={'oops... something went wrong'} intent={Intent.DANGER}>
				{product.error}
			</Callout>
		</section>
	}

	if (product.status === STATUS_NOT_FOUND) {
		return <section>
			<NonIdealState
				title={'Product not found'}
				icon={'search'}
				description={product.error}
			/>
		</section>
	}

	const onEditHandler = () => {
		history.push(generateEditProductLink(filterType, listOrCategoryId, productId))
	}

	const imageStyle = {
		backgroundImage: 'url(' + product.model.image + ')'
	}

	let barcodeImg = (
		<span className='product-details__barcode'>
			<p className='product-details__barcode-text'>{t('product.barcode')}:</p>{product.model.barcode}
		</span>
	)

	if (product.model.barcode) {
		const barcodeBase64 = textToBase64Barcode(product.model.barcode)

		if (barcodeBase64) {
			barcodeImg = (
				<img src={barcodeBase64}/>
			)
		}
	}

	return (
		<div className='product-details'>
			<div className='product-details__wrapper-image'>
				<div className='product-details__image' style={imageStyle}>
				</div>
				<div className='product-details__edit product-details__edit--tablet-width-min'>
					<Button className='tablet-hide-width-max' icon={'edit'} minimal={true}
						onClick={onEditHandler}>{t('product.button_edit')}</Button>
					<Button className='tablet-hide-width-max' onClick={() => {
						deleteProduct(productId)
					}} icon={'delete'} minimal={true} intent={Intent.DANGER}>{t('product.button_delete')}</Button>
					{barcodeImg}

					<Button className='tablet-hide-width-max' minimal={true} onClick={() => {
						if (product.model.link) {
							window.open(product.model.link)
						}
					}}>{t('product.link_to_the_shop')}</Button>
				</div>
			</div>

			<div className='product-details__wrapper-details'>
				<div className='product-details__edit product-details__edit--tablet-width-max tablet-hide-width-min'>
					<Button onClick={() => {
						if (product.model.link) {
							window.open(product.model.link)
						}
					}}
					minimal={true}
					>{t('product.link_to_the_shop')}</Button>
					<ButtonGroup>
						<Button icon={'edit'} minimal={true} onClick={onEditHandler}>{t('product.button_edit')}</Button>
						<Button onClick={() => {
							deleteProduct(productId)
						}} icon={'delete'} minimal={true} intent={Intent.DANGER}>{t('product.button_delete')}</Button>
					</ButtonGroup>
				</div>
				<h1>{product.model.title}</h1>
				<p className='product-details__description'>{product.model.description}</p>
				<div className="product-details__stock product-stock-icon">
					<Icon
						className='product-stock-icon__icon'
						icon={'cube'}
						iconSize={22}/>{product.model.stock}</div>
				<ProductsTags
					className='product-details__tags'
					list={product.model.list}
					categories={product.model.categories}/>
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const product = getProduct(state)
	const productId = ownProps.productId
	const listOrCategoryId = ownProps.listOrCategoryId
	const filterType = ownProps.filterType
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	return { productId, product, filterType, listOrCategoryId, t }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		fetchProduct: (id) => dispatch(fetchProduct(id, locale)),
		deleteProduct: (id) => dispatch(deleteProduct(id, locale)),
		reset: () => dispatch(resetProduct(locale)),
		closePopover: ownProps.closePopover
	}
}

ProductDetails.propTypes = {
	fetchProduct: PropTypes.func,
	deleteProduct: PropTypes.func,
	reset: PropTypes.func,
	product: PropTypes.object,
	productId: PropTypes.string,
	listOrCategoryId: PropTypes.string,
	filterType: PropTypes.string,
	closePopover: PropTypes.func,
	t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ProductDetails)
