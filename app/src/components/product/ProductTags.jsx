import * as React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const ProductsTags = ({ list, categories, i18n, className }) => {
	let productListTag
	if (list) {
		productListTag = <span className={'product-tag product-tag--list'}>{list.title}</span>
	}

	let productCategoriesTags
	if (categories) {
		productCategoriesTags = categories.map((item) => {
			return (<span className={'product-tag product-tag--category'} key={item.id}>{item.title}</span>)
		})
	}

	return (
		<div className={className} >
			{productListTag}
			{productCategoriesTags}
		</div>
	)
}

ProductsTags.propTypes = {
	categories: PropTypes.object,
	list: PropTypes.object,
	i18n: PropTypes.object,
	className: PropTypes.string
}

export default withTranslation('translations')(ProductsTags)
