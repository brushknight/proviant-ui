import * as React from 'react'
import {Button, FormGroup, InputGroup, Intent, NumericInput} from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchProducts } from '../../../common/redux/actions/product/products'
import { getProducts, getShoppingList, getShoppingListEdit, getShoppingListItem } from '../../../common/redux/selectors'
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
import Select from 'react-select'
import {DateInput} from "@blueprintjs/datetime";
import {unixToDate} from "../../../common/utils/date";

const ShoppingListItem = (
	{
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
		closePopover,
		products,
		fetchProducts
	}) => {
	const [title, setTitle] = useState('')
	const [quantity, setQuantity] = useState(0)
	const [price, setPrice] = useState(0.00)
	const [dueDate, setDueDate] = useState(new Date())
	const [productId, setProductId] = useState(null)
	const [statusInternal, setStatusInternal] = useState('')

	const emptyForm = () => {
		setTitle('')
		setQuantity(1)
		setPrice(0)
		setDueDate(new Date())
		setStatusInternal(STATUS_DEFAULT)
		setProductId(null)
	}

	useEffect(() => {
		if (fetchStatus === STATUS_LOADED || fetchStatus === STATUS_DEFAULT) {
			setTitle(item.title)
			setPrice(item.price)
			setQuantity(item.quantity)
			setProductId(item.product_id)
			setDueDate( item.due_date ? new Date(item.due_date) : new Date())
		}

		if (products.status !== STATUS_LOADED) {
			fetchProducts()
		}

		setStatusInternal(status)

		if (status === STATUS_UPDATED || status === STATUS_DELETED) {
			emptyForm()
			reset()
			closePopover()
		}
	}, [
		fetchStatus, status, products.status
	])

	const onSubmit = (e) => {
		e.preventDefault()

		updateItem(listId, id, {
			title,
			quantity,
			price,
			due_date: +dueDate,
			checked: item.checked,
			product_id: productId
		})
	}

	const convertModelToValue = (model) => {
		return { value: model.id, label: model.title }
	}
	let productsForSelect = []
	let productModel = null

	if (products.items.length > 0) {
		productsForSelect = products.items.map((item) => {
			return convertModelToValue(item)
		})

		productModel = products.items.find((item) => {
			return Number(item.id) === Number(productId)
		})
	}

	if (productModel) {
		productModel = convertModelToValue(productModel)
	}

	const jsDateFormatter = {
		// note that the native implementation of Date functions differs between browsers
		formatDate: date => unixToDate(date),
		placeholder: 'DD/MM/YYYY',
		value: dueDate,
		parseDate: str => new Date(str),
		maxDate: new Date('2100/01/01'),
		onChange: (date) => {
			setDueDate(date)
		}
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
						if (isNaN(parseFloat(e.target.value))) {
							setPrice(0)
							setStatusInternal(STATUS_EDITING)
						} else {
							setPrice(parseFloat(e.target.value))
							setStatusInternal(STATUS_EDITING)
						}
					}}
				/>
				<NumericInput
					leftIcon={'shopping-cart'}
					className={'shopping-list-edit__quantity'}
					min={1}
					value={quantity}
					onValueChange={value => setQuantity(value)}
				/>
				<Select
					className='shopping-list-edit__product'
					options={productsForSelect}
					isMulti={false}
					placeholder={t('shopping_list_item.select_product')}
					onChange={(event) => {
						setProductId(event.value)
						setStatusInternal(STATUS_EDITING)
					}}
					value={productModel}
				/>
				<FormGroup
					className={'shopping-list-edit__due_date'}
					label={t('shopping_list_item.due_date')}
					inline={true}
				>
					<DateInput {...jsDateFormatter} />
				</FormGroup>
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
						icon={'delete'}
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
	const products = getProducts(state)

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
		products: products,
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
		fetchProducts: () => dispatch(fetchProducts(null, locale)),
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
	i18n: PropTypes.object,
	products: PropTypes.object
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ShoppingListItem)
