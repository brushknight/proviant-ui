import * as React from 'react'
import Button from './generic/Button'

const Sandbox = () => {
	return (
		<div>
			<header className={'page-header'}>
				<div className={'page-header__list-navigation list-navigation'}>
					<div className={'list-navigation__wrapper-fot-button-toggle'}>
						<button className={'list-navigation__button-toggle list-navigation__button-toggle--close list-navigation__button-toggle--open'} type={'button'}/>
						<h1 className={'list-navigation__title'}>Список 1</h1>
					</div>
					<div className={'list-navigation__wrapper-for-list'}>
						<div className={'list-navigation__wrapper-for-title'}>
							<h2 className={'list-navigation__title-list'}>Списки</h2>
							<Button className={'list-navigation__title-button'} type={'button'} text={'Добавить'} icon={'plus'}/>
						</div>
						<ul className={'list-navigation__list'}>
							<li className={'list-navigation__item'}>
								<h3 className={'list-navigation__item-title'}>Список 1</h3>
								<Button className={'list-navigation__item-button'} icon={'edit'}/>
							</li>
						</ul>
					</div>
				</div>
				<div className={'page-header__search search'}>
					<button className={'search__button'} type={'button'}><span>Поиск и категории</span></button>
					<div className={'search__wrapper'}>
						<input className={'search__search'}/>
						<div className={'search__categories'}>Тут будут категории</div>
					</div>
				</div>
				<a className={'page-header__profile-link profile-link'}>Личный аккаунт</a>
				<div className={'page-header__product-addition product-addition'}>
					<input className={'product-addition__input'}/>
					<Button className={'product-addition__button'} text={'Какая то кнопка'} icon={'plus'}/>
				</div>
			</header>
			<main/>
		</div>
	)
}

export default Sandbox
