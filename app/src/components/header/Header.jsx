import * as React from 'react'
import Navigation from '../menu/Navigation'
import Overlay from './Overlay'
import Profile from './Profile'
import Search from './Search'
import {useState} from "react";

const PageHeader = () => {

	const [isOverlayOpen, setIsOverlayOpen] = useState(false)
	return (
		<header className={'page-header'}>
			<Navigation
				setIsOverlayOpen={setIsOverlayOpen}
			/>
			<Search/>
			<Profile/>
			<Overlay
				isOpen={isOverlayOpen}
			/>
		</header>
	)
}

export default PageHeader
