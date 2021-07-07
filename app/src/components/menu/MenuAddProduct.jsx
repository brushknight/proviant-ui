import * as React from 'react'
import { Classes, Intent, Menu, MenuItem } from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const MenuAddProduct = (props) => {
	const history = useHistory()

	return (
		<Menu
			className={`${
				Classes.ELEVATION_0
			} page-header__navigation-list`}
		>
			<MenuItem icon="plus" text={props.i18n.t('global.button_add_product')} intent={Intent.PRIMARY} onClick={() => {
				history.push('/product/new')
			}}/>
		</Menu>
	)
}

MenuAddProduct.propTypes = {
	i18n: PropTypes.object
}

export default withTranslation('translations')(MenuAddProduct)
