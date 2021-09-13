import * as React from 'react'
import { Callout, Classes, Intent, Menu, MenuDivider, Spinner } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createCategory, fetchCategories } from '../../../common/redux/actions/categories'
import { getCategories } from '../../../common/redux/selectors'
import { parseLocationFromUri, ROUTE_CATEGORY, ROUTE_LIST } from '../../../common/utils/link'
import { STATUS_ERROR, STATUS_LOADING } from '../../../common/redux/reducers/consts'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import Button from '../generic/Button'
import Item from './Item'
import PropTypes from 'prop-types'

const MenuCategories = ({ categories, t, fetchCategories, createList }) => {
	const history = useHistory()
	const currentRoute = parseLocationFromUri(location.pathname)

	useEffect(() => {
		fetchCategories()
	}, [])

	const goToList = (id) => {
		history.push(`/category/${id}`)
	}

	const createCategory = () => {
		history.push('/category-new')
	}

	if (categories.status === STATUS_LOADING) {
		return (
			<ul className={'menu page-header__navigation-list page-header__navigation-list--side-bar'}>
				<li className={'menu__title'}>
					{t('menu_category.title')}
				</li>
				<Spinner/>
			</ul>
		)
	}

	if (categories.status === STATUS_ERROR) {
		return (
			<ul className={'menu page-header__navigation-list page-header__navigation-list--side-bar'}>
				<li className={'menu__title'}>
					{t('menu_category.title')}
				</li>
				<Callout title={t('global.ooops')} intent={Intent.DANGER}>
					{categories.error}
				</Callout>
			</ul>
		)
	}

	if (categories.items.length === 0) {
		return (
			<ul className={'menu page-header__navigation-list page-header__navigation-list--side-bar'}>
				<li className={'menu__title'}>
					{t('menu_category.title')}
					<Button
						className={'menu__title-button'}
						text={t('global.button_add')}
						icon={'plus'}
						onClick={createCategory}
					/>
				</li>
			</ul>
		)
	}

	return (
		<ul className={'menu page-header__navigation-list page-header__navigation-list--side-bar'}>
			<li className={'menu__title'}>
				{t('menu_category.title')}
				<Button
					className={'menu__title-button'}
					text={t('global.button_add')}
					icon={'plus'}
					onClick={createCategory}
				/>
			</li>
			{categories.items.map(item => (
				<Item
					key={item.id}
					icon="dot"
					text={item.title}
					onClick={() => goToList(item.id)}
					isActive={currentRoute.route === ROUTE_CATEGORY && currentRoute.id === item.id}
					button={{
						icon: 'edit',
						action: () => {
							history.push('/category/' + item.id + '/edit')
						}
					}}
				/>
			))}
		</ul>
	)
}

const mapStateToProps = (state, ownProps) => {
	const categories = getCategories(state)
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	return { categories, t }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language

	return {
		fetchCategories: () => dispatch(fetchCategories(locale)),
		createList: (title) => dispatch(createCategory(title, locale))
	}
}

MenuCategories.propTypes = {
	fetchCategories: PropTypes.func,
	createList: PropTypes.func,
	categories: PropTypes.object,
	t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(MenuCategories)
