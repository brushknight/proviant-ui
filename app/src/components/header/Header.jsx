import * as React from 'react'
import AddProductForm from './AddProductForm'
import Navigation from '../menu/Navigation'
import Overlay from '../generic/Overlay'
import Profile from './Profile'
import Search from './Search'

const PageHeader = () => {
	return (
		<header className={'page-header'}>
			<Navigation/>
			<Search/>
			<Profile/>
			<Overlay/>
		</header>
	)
}

export default PageHeader
