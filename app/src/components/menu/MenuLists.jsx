import * as React from 'react'
import { Callout, Classes, Intent, Menu, MenuDivider, Spinner } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchLists } from '../../redux/actions/lists'
import { getLists } from '../../redux/selectors'
import { STATUS_ERROR, STATUS_LOADING } from '../../redux/reducers/consts'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import Button from '../generic/Button'
import CreateForm from './CreateForm'
import Item from './Item'
import PropTypes from 'prop-types'

const MenuLists = ({ lists, t, fetchLists }) => {
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

	const createList = () => {
		history.push('/list-new')
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
			<Callout title={t('global.ooops')} intent={Intent.DANGER}>
				{lists.error}
			</Callout>
		</Menu>
	}

	if (lists.items.length === 0) {
		return (
			<ul className={'menu page-header__navigation-list page-header__navigation-list--side-bar'}>
				<li className={'menu__title'}>
					{t('menu_list.title')}
					<Button
						className={'menu__title-button'}
						text={'add'}
						icon={'plus'}
						onClick={createList}
					/>
				</li>
				<Item
					key={'all'}
					icon="dot"
					text={t('menu_list.all_products')}
					onClick={() => goToAllProduct()}
				/>
			</ul>
		)
	}

	return (
		<ul className={'menu page-header__navigation-list page-header__navigation-list--side-bar'}>
			<li className={'menu__title'}>
				{t('menu_list.title')}
				<Button
					className={'menu__title-button'}
					text={'add'}
					icon={'plus'}
					onClick={createList}
				/>
			</li>
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
		</ul>
	)
}

const mapStateToProps = (state, ownProps) => {
	const lists = getLists(state)
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	return { lists, t }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language

	return {
		fetchLists: () => dispatch(fetchLists(locale))
	}
}

MenuLists.propTypes = {
	fetchLists: PropTypes.func,
	lists: PropTypes.object,
	t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(MenuLists)
