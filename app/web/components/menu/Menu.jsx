import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchCategories } from '../../../common/redux/actions/categories'
import { fetchLists } from '../../../common/redux/actions/lists'
import { getCategories, getLists } from '../../../common/redux/selectors'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const Item = ({ title, onEdit, onClick }) => {
	let editButton = ''

	if (onEdit) {
		editButton = (
			<button className={'list-navigation__item-button'} onClick={(e) => {
				e.stopPropagation()
				onEdit()
			}}>
				<div>
					<svg className={'list-navigation__item-button-svg'} data-icon="edit" width="16" height="16"
						 viewBox="0 0 16 16">
						<path className={'list-navigation__item-button-path'}
							  d="M3.25 10.26l2.47 2.47 6.69-6.69-2.46-2.48-6.7 6.7zM.99 14.99l3.86-1.39-2.46-2.44-1.4 3.83zm12.25-14c-.48 0-.92.2-1.24.51l-1.44 1.44 2.47 2.47 1.44-1.44c.32-.32.51-.75.51-1.24.01-.95-.77-1.74-1.74-1.74z"
							  fillRule="evenodd"></path>
					</svg>
				</div>
			</button>
		)
	}

	return (
		<li className={'list-navigation__item'} onClick={onClick}>
			<h3 className={'list-navigation__item-title'}>{title}</h3>
			{editButton}
		</li>
	)
}

const AddButton = ({ t, onClick }) => {
	return (
		<button className={'list-navigation__title-button'} onClick={onClick}>
			<svg className={'list-navigation__title-button-svg'} data-icon="plus" width="16" height="16"
				 viewBox="0 0 16 16">
				<path className={'list-navigation__title-button-path'}
					  d="M13 7H9V3c0-.55-.45-1-1-1s-1 .45-1 1v4H3c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1V9h4c.55 0 1-.45 1-1s-.45-1-1-1z"
					  fillRule="evenodd"></path>
			</svg>
			<span className={'list-navigation__title-button-text'}>{t('global.button_add')}</span>
		</button>
	)
}

const Menu = ({ isOpen, setIsOpen, lists, categories, fetchLists, fetchCategories, t }) => {
	const history = useHistory()

	useEffect(() => {
		fetchLists()
		fetchCategories()
	}, [])

	let toggleStyle = 'list-navigation__wrapper-for-list--hidden'
	if (isOpen) {
		toggleStyle = ''
	}

	const createCategory = () => {
		history.push('/category-new')
	}

	const createList = () => {
		history.push('/list-new')
	}

	const goToList = (id) => {
		history.push(`/list/${id}`)
	}

	const goToAllProducts = () => {
		history.push('/')
	}

	const goToCategory = (id) => {
		history.push(`/category/${id}`)
	}

	const goToShoppingList = (id) => {
		history.push('/shopping')
	}

	return (
		<div className={'list-navigation__wrapper-for-list ' + toggleStyle}>
			<div className={'list-navigation__wrapper-for-title list-navigation__wrapper-for-title--interactive'}
				 onClick={() => {
					 setIsOpen(false)
					 goToShoppingList()
				 }}
			>
				<h2 className={'list-navigation__title-list'}>{t('navigation.shopping_list')}</h2>
			</div>
			<div className={'list-navigation__wrapper-for-title'}>
				<h2 className={'list-navigation__title-list'}>{t('navigation.lists')}</h2>
				<AddButton
					t={t}
					onClick={() => {
						setIsOpen(false)
						createList()
					}}
				/>
			</div>
			<ul className={'list-navigation__list'}>
				<Item
					title={t('navigation.all_products')}
					onClick={(e) => {
						setIsOpen(false)
						goToAllProducts()
					}}
				/>
				{lists.items.map(item => (
					<Item
						title={item.title}
						onClick={(e) => {
							setIsOpen(false)
							goToList(item.id)
						}}
						onEdit={() => {
							setIsOpen(false)
							history.push('/list/' + item.id + '/edit')
						}}
					/>
				))}
			</ul>
			<div className={'list-navigation__wrapper-for-title'}>
				<h2 className={'list-navigation__title-list'}>{t('navigation.categories')}</h2>
				<AddButton
					t={t}
					onClick={() => {
						setIsOpen(false)
						createCategory()
					}}
				/>
			</div>
			<ul className={'list-navigation__list'}>
				{categories.items.map(item => (
					<Item
						title={item.title}
						onClick={(e) => {
							e.stopPropagation()
							setIsOpen(false)
							goToCategory(item.id)
						}}
						onEdit={() => {
							setIsOpen(false)
							history.push('/category/' + item.id + '/edit')
						}}
					/>
				))}
			</ul>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const lists = getLists(state)
	const categories = getCategories(state)
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	return { lists, categories, t }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language

	return {
		fetchLists: () => dispatch(fetchLists(locale)),
		fetchCategories: () => dispatch(fetchCategories(locale))
	}
}

Menu.propTypes = {
	fetchLists: PropTypes.func,
	fetchCategories: PropTypes.func,
	lists: PropTypes.object,
	t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(Menu)
