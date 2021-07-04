import * as React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from './ProductDetails'
import StockList from '../StockList'

const Product = () => {
	const { productId } = useParams()

	return (
		<div className="content">
			<ProductDetails productId={productId}/>
			<StockList productId={productId}/>
		</div>
	)
}

export default Product
