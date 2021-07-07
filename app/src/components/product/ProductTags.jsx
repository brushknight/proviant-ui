import * as React from 'react'
import { Tag } from '@blueprintjs/core'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const ProductsTags = ({ list, categories, i18n }) => {
	let productListTag
	if (list) {
		productListTag = <Tag>{list.title}</Tag>
	}

	let productCategoriesTags
	if (categories) {
		productCategoriesTags = categories.map((item) => {
			return (<Tag key={item.id}>{item.title}</Tag>)
		})
	}

	return (
		<div>
			{productListTag}
			{productCategoriesTags}
		</div>
	)
}

ProductsTags.propTypes = {
	categories: PropTypes.object,
	list: PropTypes.object,
	i18n: PropTypes.object
}

export default withTranslation('translations')(ProductsTags)
