import * as React from 'react'
import { Intent } from '@blueprintjs/core'
import { useHistory, useLocation } from 'react-router-dom'

import { withTranslation } from 'react-i18next'
import Button from '../generic/Button'
import PropTypes from 'prop-types'

const MenuAddProduct = (props) => {
	const history = useHistory()
	const location = useLocation()
	let newProductUrl = location.pathname
	if (newProductUrl.slice(-1) !== '/') {
		newProductUrl += '/'
	}

	newProductUrl += 'product-new'

	console.log(newProductUrl)

	return (
		<Button
			icon="plus"
			className={'page-header__add-product'}
			text={props.i18n.t('global.button_add_product')}
			onClick={() => {
				console.log(newProductUrl)
				history.push(newProductUrl)
			}}
		/>
	)
}

MenuAddProduct.propTypes = {
	i18n: PropTypes.object
}

export default withTranslation('translations')(MenuAddProduct)
