import * as React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from './ProductDetails'
import PropTypes from 'prop-types'
import StockList from '../StockList'

const Product = (props) => {
	const { id, productId } = useParams()

	return (
		<div className="content">
			<ProductDetails
				closePopover={props.closePopover}
				productId={productId}
				listOrCategoryId={id}
				filterType={props.filterType}
			/>
			<StockList productId={productId}/>
		</div>
	)
}

Product.propTypes = {
	closePopover: PropTypes.func,
	filterType: PropTypes.string
}

export default Product
