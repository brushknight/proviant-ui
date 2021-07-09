import * as React from 'react'
import { Button, ButtonGroup, Callout, Intent, NonIdealState, Spinner, Tag } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { deleteProduct, fetchProduct, resetProduct } from '../../redux/actions/product'
import { getProduct } from '../../redux/selectors'
import { STATUS_ERROR, STATUS_LOADING, STATUS_NOT_FOUND, STATUS_SUCCESS } from '../../redux/reducers/consts'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { compose } from 'redux'
import { generateEditProductLink } from '../../utils/link'
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

	let backButton

	if (closePopover) {
		backButton = (
			<Button icon={'cross'} minimal={true} onClick={closePopover}>{t('product.button_back')}</Button>
		)
	}
	const imageStyle = {
		backgroundImage: 'url(' + product.model.image + ')'
	}

	return (
		<section className='product'>
			<div className='product__wrapper'>
				<div className='product__image' style={imageStyle}>
				</div>
				<div className='product__edit product__edit--tablet-width-min'>
					{backButton}
					<Button className='tablet-hide-width-max' icon={'edit'} minimal={true} onClick={onEditHandler}>{t('product.button_edit')}</Button>
					<Button className='tablet-hide-width-max' onClick={() => {
						deleteProduct(productId)
					}} icon={'delete'} minimal={true} intent={Intent.DANGER}>{t('product.button_delete')}</Button>
					<p><Tag minimal={true}>{t('product.barcode')}</Tag>{product.model.barcode}</p>
					<Button className='tablet-hide-width-max' minimal={true} onClick={() => {
						if (product.model.link) {
							window.open(product.model.link)
						}
					}}>{t('product.link_to_the_shop')}</Button>
				</div>
			</div>

			<div>

				<div className='product__edit product__edit--tablet-width-max tablet-hide-width-min'>
					<Button onClick={() => {
						if (product.model.link) {
							window.open(product.model.link)
						}
					}}>{t('product.link_to_the_shop')}</Button>
					<ButtonGroup>
						<Button icon={'edit'} minimal={true} onClick={onEditHandler}>{t('product.button_edit')}</Button>
						<Button onClick={() => {
							deleteProduct(productId)
						}} icon={'delete'} minimal={true} intent={Intent.DANGER}>{t('product.button_delete')}</Button>
					</ButtonGroup>
				</div>

				<h1>{product.model.title}</h1>
				<p>{product.model.description}</p>
				<div>
					<ProductsTags
						list={product.model.list}
						categories={product.model.categories}/>
				</div>
			</div>
		</section>
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
