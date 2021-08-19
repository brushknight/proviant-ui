import * as React from 'react'

const Overlay = () => {
	return (
		<div className={'overlay'}/>
	)
}

const Sandbox = () => {
	return (
		<div>
			<header className={'page-header'}>
				<div className={'page-header__list-navigation list-navigation list-navigation--open'}>
					<div className={'list-navigation__wrapper-for-button-toggle'}>
						<button className={'list-navigation__button-toggle'} type={'button'}>
							<span className={'list-navigation__button-toggle-icon'}>
								<svg className={'list-navigation__button-toggle-svg'} data-icon="menu" width="20" height="20" viewBox="0 0 20 20">
									<path className={'list-navigation__button-toggle-path'} d="M1 6h18c.55 0 1-.45 1-1s-.45-1-1-1H1c-.55 0-1 .45-1 1s.45 1 1 1zm18 3H1c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1zm0 5H1c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1z" fillRule="evenodd"></path>
								</svg>
							</span>
							<span className={'list-navigation__button-toggle-icon list-navigation__button-toggle-icon--hidden'}>
								<svg className={'list-navigation__button-toggle-svg'} data-icon="cross" width="20" height="20" viewBox="0 0 20 20">
									<path className={'list-navigation__button-toggle-path'} d="M11.41 10l4.29-4.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L10 8.59l-4.29-4.3a1.003 1.003 0 00-1.42 1.42L8.59 10 4.3 14.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l4.29-4.3 4.29 4.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L11.41 10z" fillRule="evenodd"></path>
								</svg>
							</span>
						</button>
						<h1 className={'list-navigation__title'}>Список 1</h1>
					</div>
					<div className={'list-navigation__wrapper-for-list list-navigation__wrapper-for-list--hidden'}>
						<div className={'list-navigation__wrapper-for-title'}>
							<h2 className={'list-navigation__title-list'}>Списки</h2>
							<button className={'list-navigation__title-button'}>
								<svg className={'list-navigation__title-button-svg'} data-icon="plus" width="16" height="16" viewBox="0 0 16 16">
									<path className={'list-navigation__title-button-path'} d="M13 7H9V3c0-.55-.45-1-1-1s-1 .45-1 1v4H3c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1V9h4c.55 0 1-.45 1-1s-.45-1-1-1z" fillRule="evenodd"></path>
								</svg>
								<span className={'list-navigation__title-button-text'}>Добавить</span>
							</button>
						</div>
						<ul className={'list-navigation__list'}>
							<li className={'list-navigation__item'}>
								<h3 className={'list-navigation__item-title'}>Список 1</h3>
								<button className={'list-navigation__item-button'}>
									<div>
										<svg className={'list-navigation__item-button-svg'} data-icon="edit" width="16" height="16" viewBox="0 0 16 16">
											<path className={'list-navigation__item-button-path'} d="M3.25 10.26l2.47 2.47 6.69-6.69-2.46-2.48-6.7 6.7zM.99 14.99l3.86-1.39-2.46-2.44-1.4 3.83zm12.25-14c-.48 0-.92.2-1.24.51l-1.44 1.44 2.47 2.47 1.44-1.44c.32-.32.51-.75.51-1.24.01-.95-.77-1.74-1.74-1.74z" fillRule="evenodd"></path>
										</svg>
									</div>
								</button>
							</li>
							<li className={'list-navigation__item'}>
								<h3 className={'list-navigation__item-title'}>Список 2</h3>
								<button className={'list-navigation__item-button'}>
									<div>
										<svg className={'list-navigation__item-button-svg'} data-icon="edit" width="16" height="16" viewBox="0 0 16 16">
											<path className={'list-navigation__item-button-path'} d="M3.25 10.26l2.47 2.47 6.69-6.69-2.46-2.48-6.7 6.7zM.99 14.99l3.86-1.39-2.46-2.44-1.4 3.83zm12.25-14c-.48 0-.92.2-1.24.51l-1.44 1.44 2.47 2.47 1.44-1.44c.32-.32.51-.75.51-1.24.01-.95-.77-1.74-1.74-1.74z" fillRule="evenodd"></path>
										</svg>
									</div>
								</button>
							</li>
						</ul>
					</div>
				</div>
				<div className={'page-header__search search'}>
					<button className={'search__button'}>
						<svg className={'search__button-svg'} data-icon="search" width="20" height="20" viewBox="0 0 20 20">
							<path className={'search__button-path'} d="M19.56 17.44l-4.94-4.94A8.004 8.004 0 0016 8c0-4.42-3.58-8-8-8S0 3.58 0 8s3.58 8 8 8c1.67 0 3.21-.51 4.5-1.38l4.94 4.94a1.498 1.498 0 102.12-2.12zM8 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fillRule="evenodd"></path>
						</svg>
					</button>
					<div className={'search__wrapper search__wrapper--hidden'}>
						<div className={'search__wrapper-search-input'}>
							<input className={'search__search-input'}/>
						</div>
						<div className={'search__categories'}>Тут будут категории</div>
					</div>
				</div>
				<div className={'page-header__profile-link profile-link'}>
					<span className={'profile-link__email'}>email</span>
					<a href={'#'} className={'profile-link__link'}>
						<svg className={'profile-link__svg'} data-icon="user" width="16" height="16" viewBox="0 0 16 16">
							<path className={'profile-link__path'} d="M7.99-.01A7.998 7.998 0 00.03 8.77c.01.09.03.18.04.28.02.15.04.31.07.47.02.11.05.22.08.34.03.13.06.26.1.38.04.12.08.25.12.37.04.11.08.21.12.32a6.583 6.583 0 00.3.65c.07.14.14.27.22.4.04.07.08.13.12.2l.27.42.1.13a7.973
					7.973 0 003.83 2.82c.03.01.05.02.07.03.37.12.75.22 1.14.29l.2.03c.39.06.79.1 1.2.1s.81-.04 1.2-.1l.2-.03c.39-.07.77-.16 1.14-.29.03-.01.05-.02.07-.03a8.037 8.037 0 003.83-2.82c.03-.04.06-.08.09-.13.1-.14.19-.28.28-.42.04-.07.08-.13.12-.2.08-.13.15-.27.22-.41.04-.08.08-.17.12-.26.06-.13.11-.26.17-.39.04-.1.08-.21.12-.32.04-.12.08-.24.12-.37.04-.13.07-.25.1-.38.03-.11.06-.22.08-.34.03-.16.05-.31.07-.47.01-.09.03-.18.04-.28.02-.26.04-.51.04-.78-.03-4.41-3.61-7.99-8.03-7.99zm0 14.4c-1.98 0-3.75-.9-4.92-2.31.67-.36 1.49-.66
					2.14-.95 1.16-.52 1.04-.84 1.08-1.27.01-.06.01-.11.01-.17-.41-.36-.74-.86-.96-1.44v-.01c0-.01-.01-.02-.01-.02-.05-.13-.09-.26-.12-.39-.28-.05-.44-.35-.5-.63-.06-.11-.18-.38-.15-.69.04-.41.2-.59.38-.67v-.06c0-.51.05-1.24.14-1.72.02-.13.05-.26.09-.39.17-.59.53-1.12 1.01-1.49.49-.38 1.19-.59 1.82-.59.62 0 1.32.2 1.82.59.48.37.84.9 1.01 1.49.04.13.07.26.09.4.09.48.14 1.21.14 1.72v.07c.18.08.33.26.37.66.03.31-.1.58-.16.69-.06.27-.21.57-.48.62-.03.13-.07.26-.12.38 0 .01-.01.04-.01.04-.21.57-.54 1.06-.94 1.42
					0 .06.01.13.01.19.04.43-.12.75 1.05 1.27.65.29 1.47.6 2.14.95a6.415 6.415 0 01-4.93 2.31z" fillRule="evenodd"></path>
						</svg>
					</a>
				</div>
				<div className={'page-header__product-addition product-addition'}>
					<input className={'product-addition__input product-addition__input--hidden'} placeholder="Название нового продукта"/>
					<button className={'product-addition__button'}>
						<svg className={'product-addition__button-svg'} data-icon="plus" width="16" height="16" viewBox="0 0 16 16">
							<path className={'product-addition__button-path'} d="M13 7H9V3c0-.55-.45-1-1-1s-1 .45-1 1v4H3c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1V9h4c.55 0 1-.45 1-1s-.45-1-1-1z" fillRule="evenodd"></path>
						</svg>
						<span className={'product-addition__button-text'}>Добавить продукт</span>
					</button>
				</div>
				<Overlay/>
			</header>
			<main/>
		</div>
	)
}

export default Sandbox
