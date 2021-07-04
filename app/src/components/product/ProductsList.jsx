import * as React from 'react'
import { Callout, Intent, NonIdealState, Spinner } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { fetchProducts } from '../../redux/actions/products'
import { getCategories, getLists, getProducts } from '../../redux/selectors'
import { STATUS_ERROR, STATUS_LOADING } from '../../redux/reducers/consts'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductsListRow from './ProductsListRow'
import PropTypes from 'prop-types'

const ProductsList = ({ products, categories, lists, filterType, fetchProducts }) => {
	let query = null
	const { id } = useParams()

	if (filterType != null) {
		if (!isNaN(Number(id))) {
			if (filterType === 'category') {
				query = {
					category: id
				}
			}
			if (filterType === 'list') {
				query = {
					list: id
				}
			}
		}
	}

	useEffect(() => {
		fetchProducts(query)
	}, [id, filterType])

	if (products.status === STATUS_LOADING) {
		return <section className="content">
			<Spinner/>
		</section>
	}

	if (products.status === STATUS_ERROR) {
		return <section className="content">
			<Callout title={'oops... something went wrong'} intent={Intent.DANGER}>
				{products.error}
			</Callout>
		</section>
	}

	if (products.items.length === 0) {
		return <section className="content">
			<NonIdealState
				title={'No products found'}
				icon={'search'}
			/>
		</section>
	}

	return <section className="content">
		{products.items.map(product => (
			<ProductsListRow key={product.id} product={product} categories={categories} lists={lists}/>
		))}
	</section>
}

const mapStateToProps = (state, ownProps) => {
	const products = getProducts(state)
	const categories = getCategories(state)
	const lists = getLists(state)
	const filterType = ownProps.filterType

	return { products, categories, lists, filterType }
}

const mapDispatchToProps = dispatch => {
	return {
		fetchProducts: (query) => dispatch(fetchProducts(query))
	}
}

ProductsList.propTypes = {
	fetchProducts: PropTypes.func,
	products: PropTypes.object,
	categories: PropTypes.object,
	lists: PropTypes.object,
	filterType: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
