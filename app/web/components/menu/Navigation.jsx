import * as React from 'react'
import { EVENT_NAVIGATION_OVERLAY_CLOCKED, subscribe } from '../../../common/utils/pubsub'
import { useEffect, useState } from 'react'
import Menu from './Menu'

const Navigation = ({ setIsOverlayOpen }) => {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const subscriber = subscribe(EVENT_NAVIGATION_OVERLAY_CLOCKED, () => {
			setIsOpen(false)
			setIsOverlayOpen(false)
		})

		return function cleanup () {
			subscriber.unsubscribe()
		}
	})

	return (
		<div className={'page-header__list-navigation list-navigation list-navigation--open'}>
			<div className={'list-navigation__wrapper-for-button-toggle ' + (isOpen ? 'list-navigation__wrapper-for-button-toggle--open' : '')}>
				<button className={'list-navigation__button-toggle'} type={'button'} onClick={() => {
					setIsOpen(!isOpen)
					setIsOverlayOpen(!isOpen)
				}}>
					<span
						className={'list-navigation__button-toggle-icon ' + (isOpen ? 'list-navigation__button-toggle-icon--hidden' : '')}>
						<svg className={'list-navigation__button-toggle-svg'} data-icon="menu" width="20"
							height="20" viewBox="0 0 20 20">
							<path className={'list-navigation__button-toggle-path'}
								d="M1 6h18c.55 0 1-.45 1-1s-.45-1-1-1H1c-.55 0-1 .45-1 1s.45 1 1 1zm18 3H1c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1zm0 5H1c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1z"
								fillRule="evenodd"></path>
						</svg>
					</span>
					<span
						className={'list-navigation__button-toggle-icon ' + (isOpen ? '' : 'list-navigation__button-toggle-icon--hidden')}>
						<svg className={'list-navigation__button-toggle-svg'} data-icon="cross" width="20"
							height="20" viewBox="0 0 20 20">
							<path className={'list-navigation__button-toggle-path'}
								d="M11.41 10l4.29-4.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L10 8.59l-4.29-4.3a1.003 1.003 0 00-1.42 1.42L8.59 10 4.3 14.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l4.29-4.3 4.29 4.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L11.41 10z"
								fillRule="evenodd"></path>
						</svg>
					</span>
				</button>
				<h1 className={'list-navigation__title'}>Proviant</h1>
			</div>
			<Menu
				isOpen={isOpen}
				setIsOpen={(isOpen) => {
					setIsOpen(isOpen)
					setIsOverlayOpen(isOpen)
				}}
			/>
		</div>
	)
}

export default Navigation
