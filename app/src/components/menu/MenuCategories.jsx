import * as React from 'react'
import { Callout, Classes, Intent, Menu, MenuDivider, Spinner } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createCategory, fetchCategories, resetCreateCategoryForm } from '../../redux/actions/categories'
import { getCategories } from '../../redux/selectors'
import { STATUS_ERROR, STATUS_LOADING } from '../../redux/reducers/consts'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import CreateForm from './CreateForm'
import Item from './Item'
import PropTypes from 'prop-types'

const MenuCategories = ({ categories, t, fetchCategories, createCategory, resetCreateCategoryForm }) => {
	const history = useHistory()

	useEffect(() => {
		fetchCategories()
	}, [])

	const goToCategory = (id) => {
		history.push(`/category/${id}`)
	}

	if (categories.status === STATUS_LOADING) {
		return <Menu
			className={`${
				Classes.ELEVATION_0
			} page-header__navigation-list page-header__navigation-list--side-bar`}
		>
			<MenuDivider title={t('menu_category.title')}/>
			<Spinner/>
		</Menu>
	}

	if (categories.status === STATUS_ERROR) {
		return <Menu
			className={`${
				Classes.ELEVATION_0
			} page-header__navigation-list page-header__navigation-list--side-bar`}
		>
			<MenuDivider title={t('menu_category.title')}/>
			<Callout title={t('global.ooops')} intent={Intent.DANGER}>
				{categories.error}
			</Callout>
		</Menu>
	}

	const createForm = <CreateForm
		placeholder={t('menu_category.create_form_placeholder')}
		icon={'tag'}
		onSubmit={(title) => createCategory(title)}
		onReset={() => resetCreateCategoryForm()}
		status={categories.createForm.status}
		error={categories.createForm.error}
	/>

	if (categories.items.length === 0) {
		return <Menu
			className={`${
				Classes.ELEVATION_0
			} page-header__navigation-list page-header__navigation-list--side-bar`}
		>
			<MenuDivider title={t('menu_category.title')}/>
			{createForm}
		</Menu>
	}

	return <Menu
		className={`${
			Classes.ELEVATION_0
		} page-header__navigation-list page-header__navigation-list--side-bar`}
	>
		<MenuDivider title={t('menu_category.title')}/>
		{createForm}
		{categories.items.map(item => (
			<Item
				key={item.id}
				icon="dot"
				text={item.title}
				onClick={() => goToCategory(item.id)}
				button={{
					icon: 'edit',
					action: () => {
						history.push('/category/' + item.id + '/edit')
					}
				}}
			/>
		))}
	</Menu>
}

MenuCategories.propTypes = {
	categories: PropTypes.object,
	fetchCategories: PropTypes.func,
	createCategory: PropTypes.func,
	resetCreateCategoryForm: PropTypes.func,
	t: PropTypes.func
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
		createCategory: (title) => dispatch(createCategory(title, locale)),
		resetCreateCategoryForm: () => dispatch(resetCreateCategoryForm(locale))
	}
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(MenuCategories)
