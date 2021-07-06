import * as React from 'react'
import { Classes, Intent, Menu, MenuItem } from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const MenuAddProduct = () => {
	const history = useHistory()
	const { t } = useTranslation()

	return (
		<Menu
			className={`${
				Classes.ELEVATION_0
			} page-header__navigation-list`}
		>
			<MenuItem icon="plus" text={t('add_product')} intent={Intent.PRIMARY} onClick={() => {
				history.push('/product/new')
			}}/>
		</Menu>
	)
}

export default MenuAddProduct
