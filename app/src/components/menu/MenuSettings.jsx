import * as React from 'react'
import { Classes, Menu } from '@blueprintjs/core'
import { withTranslation } from 'react-i18next'
import Localization from './Localization'

class MenuSettings extends React.Component {
	render () {
		return (
			<Menu
				className={`${
					Classes.ELEVATION_0
				} page-header__navigation-list page-header__navigation-list--menu-bottom`}
			>
				<Localization/>
				{/* <MenuItem icon="cog" text="Settings"/> */}
			</Menu>
		)
	}
}

export default withTranslation('translations')(MenuSettings)
