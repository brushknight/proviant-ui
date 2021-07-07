import * as React from 'react'
import { Button, Callout, Intent, NonIdealState, Spinner } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchProducts } from '../../redux/actions/products'
import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST } from '../../const'
import { getCategories, getLists, getProducts } from '../../redux/selectors'
import { STATUS_ERROR, STATUS_LOADING } from '../../redux/reducers/consts'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useTranslation, withTranslation } from 'react-i18next'
import ProductsListRow from './ProductsListRow'
import PropTypes from 'prop-types'

const ProductsList = ({ products, categories, lists, filterType, fetchProducts }) => {
	const { t } = useTranslation()
	const history = useHistory()

	let query = null
	const { id } = useParams()

	if (filterType != null) {
		if (!isNaN(Number(id))) {
			if (filterType === FILTER_TYPE_CATEGORY) {
				query = {
					category: id
				}
			}
			if (filterType === FILTER_TYPE_LIST) {
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
		return (
			<section className="content">
				<Spinner/>
			</section>
		)
	}

	if (products.status === STATUS_ERROR) {
		return (
			<section className="content">
				<Callout title={'oops... something went wrong'} intent={Intent.DANGER}>
					{products.error}
				</Callout>
			</section>
		)
	}

	if (products.items.length === 0) {
		return (
			<section className="content">
				<NonIdealState
					title={t('product_list.no_products_found')}
					icon={'search'}
				>
					<Button icon={'plus'} intent={Intent.PRIMARY} onClick={() => {
						history.push('/product/new')
					}}>
						{t('global.button_add_product')}
					</Button>
				</NonIdealState>
			</section>
		)
	}

	return (
		<section className="content">
			{products.items.map(product => (
				<ProductsListRow
					filterType={filterType}
					key={product.id}
					product={product}
					categories={categories}
					lists={lists}
				/>
			))}
		</section>
	)
}

const mapStateToProps = (state, ownProps) => {
	const products = getProducts(state)
	const categories = getCategories(state)
	const lists = getLists(state)
	const filterType = ownProps.filterType

	return { products, categories, lists, filterType }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		fetchProducts: (query) => dispatch(fetchProducts(query, locale))
	}
}

ProductsList.propTypes = {
	fetchProducts: PropTypes.func,
	products: PropTypes.object,
	categories: PropTypes.object,
	lists: PropTypes.object,
	filterType: PropTypes.string
}

export default compose(withTranslation('translation'), connect(mapStateToProps, mapDispatchToProps))(ProductsList)
