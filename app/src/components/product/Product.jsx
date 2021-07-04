import * as React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from './ProductDetails'
import PropTypes from 'prop-types'
import StockList from '../StockList'

const Product = (props) => {
	const { productId } = useParams()

	return (
		<div className="content">
			<ProductDetails closePopover={props.closePopover} productId={productId}/>
			<StockList productId={productId}/>
		</div>
	)
}

Product.propTypes = {
	closePopover: PropTypes.func
}

export default Product
