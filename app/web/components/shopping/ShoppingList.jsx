import * as React from 'react'
import { Callout, Intent, Spinner } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { GA_PAGE_SHOPPING_LIST, pageView } from '../../../common/utils/ga'
import { getShoppingList } from '../../../common/redux/selectors'
import { shoppingListFetchItems } from '../../../common/redux/actions/shopping/list'
import { shoppingListItemCheck, shoppingListItemUncheck } from '../../../common/redux/actions/shopping/tick'
import { STATUS_FETCH_FAILED, STATUS_LOADING } from '../../../common/redux/reducers/consts'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import ShoppingListRow from './ShoppingListRow'
import ShoppingQuickAddForm from './ShoppingQuickAddForm'

const ShoppingList = ({ status, error, model, items, t, fetchItems, checkItem, uncheckItem, cartCost }) => {
	const { id } = useParams()

	useEffect(() => {
		fetchItems(id)
	}, [id])

	if (status === STATUS_LOADING) {
		return (
			<section className={'shopping-list'}>
				<Spinner/>
			</section>
		)
	}

	if (status === STATUS_FETCH_FAILED) {
		return (
			<section className={'shopping-list'}>
				<Callout title={t('global.ooops')} intent={Intent.DANGER}>
					{error}
				</Callout>
			</section>
		)
	}

	if (items.length === 0) {
		return (
			<section className={'shopping-list'}>
				<ShoppingQuickAddForm
					listId={Number(id)}
				/>
			</section>
		)
	}

	pageView(GA_PAGE_SHOPPING_LIST)

	return (
		<section className={'shopping-list'}>
			<ShoppingQuickAddForm
				listId={Number(id)}
			/>
			<div className={'shopping-list__header shopping-list-header'}>
				<div className={'shopping-list-header__text'}>{t('shopping_list.total_cost')}</div>
				<div className={'shopping-list-header__cost'}>{cartCost}</div>
			</div>
			{items.map(item => (
				<ShoppingListRow
					key={'shopping-' + item.id}
					listId={id}
					item={item}
					onCheck={() => {
						checkItem(id, item.id)
					}}
					onUncheck={() => {
						uncheckItem(id, item.id)
					}}
				/>
			))}
		</section>
	)
}

const mapStateToProps = (state, ownProps) => {
	const shoppingList = getShoppingList(state)

	const t = ownProps.i18n.t.bind(ownProps.i18n)

	const skipChecked = (obj) => {
		if (typeof obj !== 'object') {
			return obj
		}

		if (obj.checked === true) {
			return 0
		}

		return obj.price * obj.quantity
	}

	const reducerSum = (previousValue, currentValue) => parseFloat(skipChecked(previousValue)) + parseFloat(skipChecked(currentValue))

	const items = shoppingList.model.items

	let cartCost = 0

	if (items.length > 1) {
		cartCost = items.reduce(reducerSum)
	} else if (items.length === 1) {
		cartCost = items[0].price
	}

	return {
		model: shoppingList.model,
		items: items,
		status: shoppingList.status,
		error: shoppingList.error,
		cartCost: Number(cartCost).toFixed(2),
		t
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		fetchItems: (query) => dispatch(shoppingListFetchItems(query, locale)),
		checkItem: (listId, id) => dispatch(shoppingListItemCheck(listId, id, locale)),
		uncheckItem: (listId, id) => dispatch(shoppingListItemUncheck(listId, id, locale))
	}
}

ShoppingList.propTypes = {
	model: PropTypes.object,
	fetchItems: PropTypes.func,
	checkItem: PropTypes.func,
	uncheckItem: PropTypes.func,
	t: PropTypes.func,
	items: PropTypes.array,
	cartCost: PropTypes.number
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ShoppingList)
