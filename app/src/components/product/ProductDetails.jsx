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
import PropTypes from 'prop-types'

const ProductDetails = ({
	productId,
	product,
	filterType,
	listOrCategoryId,
	fetchProduct,
	deleteProduct,
	reset,
	closePopover
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

	let productListTag

	if (product.model.list) {
		productListTag = <Tag>{product.model.list.title}</Tag>
	}

	let productCategoriesTags
	if (product.model.categories) {
		productCategoriesTags = product.model.categories.map((item) => {
			return (<Tag key={item.id}>{item.title}</Tag>)
		})
	}

	let backButton

	if (closePopover) {
		backButton = (
			<Button icon={'cross'} minimal={true} onClick={closePopover}>Back</Button>
		)
	}

	return <section>
		<ButtonGroup>
			{backButton}
			<Button icon={'edit'} minimal={true} onClick={onEditHandler}>Edit product</Button>
			<Button onClick={() => {
				deleteProduct(productId)
			}} icon={'delete'} minimal={true} intent={Intent.DANGER}>Delete product</Button>
		</ButtonGroup>
		<img src={product.model.image} alt={product.model.title} width={100} height={100}/>
		<h1>{product.model.title}</h1>
		<p>{product.model.description}</p>
		<p><Tag minimal={true}>Barcode</Tag>{product.model.barcode}</p>
		<p>List {productListTag}</p>
		<p>Categories {productCategoriesTags}</p>
		<Button onClick={() => {
			if (product.model.link) {
				window.open(product.model.link)
			}
		}}>Link to buy</Button>
	</section>
}

const mapStateToProps = (state, ownProps) => {
	const product = getProduct(state)
	const productId = ownProps.productId
	const listOrCategoryId = ownProps.listOrCategoryId
	const filterType = ownProps.filterType
	return { productId, product, filterType, listOrCategoryId }
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
	closePopover: PropTypes.func
}

export default compose(withTranslation('translation'), connect(mapStateToProps, mapDispatchToProps))(ProductDetails)
