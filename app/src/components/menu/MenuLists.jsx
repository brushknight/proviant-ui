import * as React from 'react'
import { Callout, Classes, Intent, Menu, MenuDivider, Spinner } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createList, fetchLists } from '../../redux/actions/lists'
import { getLists } from '../../redux/selectors'
import { STATUS_ERROR, STATUS_LOADING } from '../../redux/reducers/consts'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation, withTranslation } from 'react-i18next'
import CreateForm from './CreateForm'
import Item from './Item'
import PropTypes from 'prop-types'

const MenuLists = ({ lists, fetchLists, createList }) => {
	const { t } = useTranslation()
	const history = useHistory()

	useEffect(() => {
		fetchLists()
	}, [])

	const goToAllProduct = () => {
		history.push('/')
	}

	const goToList = (id) => {
		history.push(`/list/${id}`)
	}

	if (lists.status === STATUS_LOADING) {
		return <Menu
			className={`${
				Classes.ELEVATION_0
			} page-header__navigation-list page-header__navigation-list--side-bar`}
		>
			<MenuDivider title={t('menu_list.title')}/>
			<Spinner/>
		</Menu>
	}

	if (lists.status === STATUS_ERROR) {
		return <Menu
			className={`${
				Classes.ELEVATION_0
			} page-header__navigation-list page-header__navigation-list--side-bar`}
		>
			<MenuDivider title={t('menu_list.title')}/>
			<Callout title={'oops... something went wrong'} intent={Intent.DANGER}>
				{lists.error}
			</Callout>
		</Menu>
	}

	const createForm = <CreateForm
		placeholder={t('menu_list.create_form_placeholder')}
		icon={'list'}
		onSubmit={title => createList(title)}
		status={lists.createForm.status}
		error={lists.createForm.error}
	/>

	if (lists.items.length === 0) {
		return <Menu
			className={`${
				Classes.ELEVATION_0
			} page-header__navigation-list page-header__navigation-list--side-bar`}
		>
			<MenuDivider title={t('menu_list.title')}/>
			{createForm}
			<Item
				key={'all'}
				icon="dot"
				text={t('menu_list.all_products')}
				onClick={() => goToAllProduct()}
			/>
		</Menu>
	}

	return <Menu
		className={`${
			Classes.ELEVATION_0
		} page-header__navigation-list page-header__navigation-list--side-bar`}
	>
		<MenuDivider title={t('menu_list.title')}/>
		{createForm}
		<Item
			key={'all'}
			icon="dot"
			text={t('menu_list.all_products')}
			onClick={() => goToAllProduct()}
		/>
		{lists.items.map(item => (
			<Item
				key={item.id}
				icon="dot"
				text={item.title}
				onClick={() => goToList(item.id)}
				button={{
					icon: 'edit',
					action: () => {
						history.push('/list/' + item.id + '/edit')
					}
				}}
			/>
		))}
	</Menu>
}

const mapStateToProps = state => {
	const lists = getLists(state)
	return { lists }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language

	return {
		fetchLists: () => dispatch(fetchLists(locale)),
		createList: (title) => dispatch(createList(title, locale))
	}
}

MenuLists.propTypes = {
	fetchLists: PropTypes.func,
	createList: PropTypes.func,
	lists: PropTypes.object
}

export default compose(withTranslation('translation'), connect(mapStateToProps, mapDispatchToProps))(MenuLists)
