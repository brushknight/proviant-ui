import * as React from 'react'
import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST, FILTER_TYPE_NONE } from '../../const'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const ProductsListRow = ({ product, categories, lists, filterType, i18n }) => {
	const history = useHistory()
	const list = lists.items.find(item => item.id === product.list_id)

	const categoriesFound = []

	product.category_ids.forEach((categoryId) => {
		const category = categories.items.find(item => item.id === categoryId)
		if (category != null) {
			categoriesFound.push(category)
		}
	})

	let productList = ''

	if (list != null) {
		productList = <span className="content__product-list">{list.title}</span>
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

	return <div className="content__product-details" onClick={() => {
		onClickHandler()
	}}>
		<div className="content__product-designation">
			<img src={product.image} width={30} height={30}/>
			<span className="content__product-status"></span>
			<span className="content__product-title">{product.title}</span>
			<span className="content__product-stock">{i18n.t('product_list_row.stock')}{product.stock}</span>
		</div>
		<div className="content__product-sorting">
			{productList}
			{categoriesFound.map(category => (
				<span key={category.id} className="content__product-category">{category.title}</span>
			))}
		</div>
	</div>
}

ProductsListRow.propTypes = {
	product: PropTypes.object,
	categories: PropTypes.object,
	lists: PropTypes.object,
	filterType: PropTypes.string,
	i18n: PropTypes.object
}

export default withTranslation('translations')(ProductsListRow)
