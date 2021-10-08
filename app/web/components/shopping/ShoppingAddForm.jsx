import * as React from 'react'
import { Button, FormGroup, Icon, Intent, NumericInput, Spinner, SpinnerSize, Tag } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { getShoppingForm, getShoppingLists } from '../../../common/redux/selectors'
import { useEffect, useState } from 'react'

import { compose } from 'redux'
import { shoppingFormReset, shoppingFormSubmit } from '../../../common/redux/actions/shopping/form'
import { shoppingListFetchLists } from '../../../common/redux/actions/shopping/lists'
import { STATUS_CREATED, STATUS_DEFAULT, STATUS_EDITING, STATUS_SENDING } from '../../../common/redux/reducers/consts'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const ShoppingAddForm = (
	{
		productId,
		title,
		price,
		t,
		addToShopping,
		shoppingList,
		fetchShoppingLists,
		form,
		formReset,
		fetchShoppingListsStatus
	}) => {
	useEffect(() => {
		if (fetchShoppingListsStatus === STATUS_DEFAULT) {
			fetchShoppingLists()
			reset()
		}

		setStatus(form.status)
	}, [fetchShoppingListsStatus, form.status])

	const [quantity, setQuantity] = useState(1)
	const [status, setStatus] = useState(STATUS_DEFAULT)

	const reset = () => {
		setQuantity(1)
		setStatus(STATUS_DEFAULT)
		formReset()
	}

	const onSubmit = (e) => {
		e.preventDefault()
		addToShopping(shoppingList.id, {
			title: title,
			quantity: quantity,
			price: price,
			product_id: productId
		})
	}

	let formLoading

	if (status === STATUS_SENDING) {
		formLoading = <Spinner size={SpinnerSize.SMALL}/>
	}

	let formSuccess

	if (status === STATUS_CREATED) {
		formSuccess = <Tag intent={Intent.SUCCESS} large={true} minimal={true}><Icon icon={'tick'}/></Tag>
	}

	return (
		<form className={'shopping-add-form'} onSubmit={onSubmit}>
			<FormGroup label={t('shopping_list.quantity')} inline={true}>
				<NumericInput
					className={'shopping-add-form__quantity-input'}
					min={1}
					value={quantity}
					onValueChange={value => {
						setQuantity(value)
						setStatus(STATUS_EDITING)
					}}
				/>
			</FormGroup>
			<Button
				icon={'shopping-cart'}
				minimal={false}
				type={'submit'}>
				{t('shopping_list.button_add')}
			</Button>
			{formLoading}
			{formSuccess}
		</form>

	)
}

const mapStateToProps = (state, ownProps) => {
	const productId = ownProps.productId
	const t = ownProps.i18n.t.bind(ownProps.i18n)

	const shoppingLists = getShoppingLists(state)
	const form = getShoppingForm(state)
	let shoppingList = {}
	if (shoppingLists.items.length > 0) {
		shoppingList = shoppingLists.items[0]
	}

	return {
		productId,
		t,
		shoppingList,
		fetchShoppingListsStatus: shoppingLists.status,
		form
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		addToShopping: (listId, dto) => dispatch(shoppingFormSubmit(listId, dto, locale)),
		formReset: () => dispatch(shoppingFormReset()),
		fetchShoppingLists: () => dispatch(shoppingListFetchLists(locale))
	}
}

ShoppingAddForm.propTypes = {
	productId: PropTypes.string,
	addToShopping: PropTypes.func,
	fetchShoppingLists: PropTypes.func,
	shoppingList: PropTypes.object,
	title: PropTypes.string,
	price: PropTypes.number,
	form: PropTypes.object,
	formReset: PropTypes.func,
	fetchShoppingListsStatus: PropTypes.string,
	t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ShoppingAddForm)
