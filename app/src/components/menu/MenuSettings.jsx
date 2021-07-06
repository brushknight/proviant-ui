import * as React from 'react'
import { Classes, Menu, MenuItem } from '@blueprintjs/core'
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

export default MenuSettings
