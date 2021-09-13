import * as React from 'react'
import { Button, InputGroup, Intent, NumericInput } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getShoppingList, getShoppingListEdit, getShoppingListItem } from '../../../common/redux/selectors'
import { shoppingItemDelete } from '../../../common/redux/actions/shopping/delete'
import { shoppingItemUpdate, shoppingListItemReset } from '../../../common/redux/actions/shopping/edit'
import { shoppingListItemCheck, shoppingListItemUncheck } from '../../../common/redux/actions/shopping/tick'
import {
	STATUS_DEFAULT,
	STATUS_DELETED,
	STATUS_EDITING,
	STATUS_ERROR,
	STATUS_LOADED,
	STATUS_UPDATED
} from '../../../common/redux/reducers/consts'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const ShoppingListItem = ({
	listId,
	id,
	item,
	fetchStatus,
	status,
	fetchError,
	error,
	t,
	className,
	updateItem,
	deleteItem,
	reset,
	closePopover
}) => {
	const [title, setTitle] = useState('')
	const [quantity, setQuantity] = useState(0)
	const [price, setPrice] = useState(0.00)
	const [statusInternal, setStatusInternal] = useState('')

	const emptyForm = () => {
		setTitle('')
		setQuantity(1)
		setPrice(0)
		setStatusInternal(STATUS_DEFAULT)
	}

	useEffect(() => {
		if (fetchStatus === STATUS_LOADED || fetchStatus === STATUS_DEFAULT) {
			setTitle(item.title)
			setPrice(item.price)
			setQuantity(item.quantity)
		}

		setStatusInternal(status)

		if (status === STATUS_UPDATED || status === STATUS_DELETED) {
			emptyForm()
			reset()
			closePopover()
		}
	}, [
		fetchStatus, status
	])

	const onSubmit = (e) => {
		e.preventDefault()

		updateItem(listId, id, {
			title,
			quantity,
			price,
			checked: item.checked
		})
	}

	return (
		<div className={'shopping-list-edit ' + className}>
			<form onSubmit={onSubmit}>
				<InputGroup
					className={'shopping-list-edit__title'}
					autoFocus={true}
					placeholder={t('shopping_list_item.title')}
					leftIcon={'tag'}
					value={title}
					onChange={(e) => {
						setTitle(e.target.value)
						setStatusInternal(STATUS_EDITING)
					}}
				/>
				<InputGroup
					className={'shopping-list-edit__price'}
					autoFocus={false}
					placeholder={t('shopping_list_item.price')}
					leftIcon={'dollar'}
					value={price}
					onChange={(e) => {
						if (!e.target.value) {
							setPrice(0)
							setStatusInternal(STATUS_EDITING)
						}
						setPrice(e.target.value)
						setStatusInternal(STATUS_EDITING)
					}}
					onBlur={(e) => {
						setPrice(parseFloat(e.target.value))
						setStatusInternal(STATUS_EDITING)
					}}
				/>
				<NumericInput
					leftIcon={'shopping-cart'}
					className={'shopping-list-edit__quantity'}
					min={1}
					value={quantity}
					onValueChange={value => setQuantity(value)}
				/>
				<div className={'shopping-list-edit__buttons'}>
					<Button
						disabled={statusInternal === STATUS_ERROR}
						icon={'tick'}
						large={true}
						minimal={true}
						intent={Intent.SUCCESS}
						type={'submit'}
					>{t('shopping_list_item.button_save')}</Button>
					<Button
						disabled={statusInternal === STATUS_ERROR}
						icon={'remove'}
						large={true}
						minimal={true}
						intent={Intent.DANGER}
						type={'button'}
						onClick={() => {
							deleteItem(listId, id)
						}}
					>{t('shopping_list_item.button_delete')}</Button>
				</div>
			</form>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const shoppingList = getShoppingList(state)
	const shoppingListEdit = getShoppingListEdit(state)
	const shoppingListItem = getShoppingListItem(state, ownProps.itemId)

	const t = ownProps.i18n.t.bind(ownProps.i18n)
	return {
		model: shoppingList.model,
		item: shoppingListItem,
		fetchStatus: shoppingList.status,
		fetchError: shoppingList.error,
		status: shoppingListEdit.status,
		error: shoppingListEdit.error,
		id: ownProps.itemId,
		listId: ownProps.listId,
		t
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		checkItem: (listId, id) => dispatch(shoppingListItemCheck(listId, id, locale)),
		uncheckItem: (listId, id) => dispatch(shoppingListItemUncheck(listId, id, locale)),
		updateItem: (listId, id, dto) => dispatch(shoppingItemUpdate(listId, id, dto, locale)),
		deleteItem: (listId, id) => dispatch(shoppingItemDelete(listId, id, locale)),
		reset: () => dispatch(shoppingListItemReset())
	}
}

ShoppingListItem.propTypes = {
	item: PropTypes.object,
	itemId: PropTypes.number,
	updateItem: PropTypes.func,
	deleteItem: PropTypes.func,
	reset: PropTypes.func,
	closePopover: PropTypes.func,
	className: PropTypes.string,
	i18n: PropTypes.object
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ShoppingListItem)
