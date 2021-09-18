import * as React from 'react'
import { isSaaS } from '../../../common/utils/env'
import { useState } from 'react'
import Navigation from '../menu/Navigation'
import Overlay from './Overlay'
import ProfileButton from './ProfileButton'
import Search from './Search'

const PageHeader = () => {
	const [isOverlayOpen, setIsOverlayOpen] = useState(false)
	return (
		<header className={'page-header'}>
			<Navigation
				setIsOverlayOpen={setIsOverlayOpen}
			/>
			<Search
				disabled={true}
			/>
			{
				isSaaS() &&
                <ProfileButton/>
			}
			<Overlay
				isOpen={isOverlayOpen}
			/>
		</header>
	)
}

export default PageHeader
