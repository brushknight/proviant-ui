import * as React from 'react'
import { Classes, Intent, Menu, MenuItem } from '@blueprintjs/core'
import { useHistory, useLocation } from 'react-router-dom'

import { withTranslation } from 'react-i18next'
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
		<Menu
			className={`${
				Classes.ELEVATION_0
			} page-header__navigation-list`}
		>
			<MenuItem icon="plus" text={props.i18n.t('global.button_add_product')} intent={Intent.PRIMARY} onClick={() => {
				console.log(newProductUrl)
				history.push(newProductUrl)
			}}/>
		</Menu>
	)
}

MenuAddProduct.propTypes = {
	i18n: PropTypes.object
}

export default withTranslation('translations')(MenuAddProduct)
