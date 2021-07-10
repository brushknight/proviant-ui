import * as React from 'react'
import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST, FILTER_TYPE_NONE } from '../../const'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import ProductsTags from './ProductTags'
import PropTypes from 'prop-types'

const ProductsListRow = ({ product, categories, lists, filterType, i18n }) => {
	const history = useHistory()
	const list = lists.items.find(item => item.id === product.list_id)

	const categoriesFound = []

	if (product.category_ids) {
		product.category_ids.forEach((categoryId) => {
			const category = categories.items.find(item => item.id === categoryId)
			if (category != null) {
				categoriesFound.push(category)
			}
		})
	}

	const onClickHandler = () => {
		switch (filterType) {
		case FILTER_TYPE_LIST:
			history.push('/list/' + list.id + '/product/' + product.id)
			break
		case FILTER_TYPE_CATEGORY:
			history.push('/category/' + list.id + '/product/' + product.id)
			break
		case FILTER_TYPE_NONE:
			history.push('/product/' + product.id)
			break
		default:
		}
	}

	return (

		<div className="product-list__product-row product-row" onClick={onClickHandler}>
			<div className="product-row__product-designation">
				<img src={product.image} width={30} height={30}/>
				<span className="product-row__product-status"></span>
				<span className="product-row__product-title">{product.title}</span>
				<span className="product-row__product-stock">{i18n.t('product_list_row.stock')}{product.stock}</span>
			</div>
			<ProductsTags list={list} categories={categoriesFound} className="product-row__product-sorting" />
		</div>
	)
}

ProductsListRow.propTypes = {
	product: PropTypes.object,
	categories: PropTypes.object,
	lists: PropTypes.object,
	filterType: PropTypes.string,
	i18n: PropTypes.object
}

export default withTranslation('translations')(ProductsListRow)
