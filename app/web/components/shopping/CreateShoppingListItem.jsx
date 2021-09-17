import * as React from 'react'
import { Button, Callout, InputGroup, Intent, NumericInput } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchProducts } from '../../../common/redux/actions/products'
import { getProducts, getShoppingForm } from '../../../common/redux/selectors'
import { shoppingFormReset, shoppingFormSubmit } from '../../../common/redux/actions/shopping/form'
import { STATUS_CREATED, STATUS_EDITING, STATUS_ERROR, STATUS_LOADED } from '../../../common/redux/reducers/consts'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Select from 'react-select'

const CreateShoppingListItem = (
	{
		status,
		error,
		t,
		className,
		submitForm,
		closePopover,
		reset,
		products,
		fetchProducts
	}
) => {
	const [title, setTitle] = useState('')
	const [quantity, setQuantity] = useState(1)
	const [price, setPrice] = useState(0.00)
	const [statusInternal, setStatusInternal] = useState('')
	const [productId, setProductId] = useState(null)

	useEffect(() => {
		setStatusInternal(status)

		if (products.status !== STATUS_LOADED) {
			fetchProducts()
		}
	}, [
		status, products.status
	])

	if (statusInternal === STATUS_CREATED) {
		reset()
		closePopover()
	}

	const onSubmit = (e) => {
		e.preventDefault()

		submitForm({
			title,
			quantity,
			price,
			product_id: productId
		})
	}

	const errorJsx = []
	if (statusInternal === STATUS_ERROR) {
		errorJsx.push((
			<Callout icon={null} intent={Intent.DANGER}>{t(error)}</Callout>
		))
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

	return (
		<div className={'shopping-list-edit ' + className}>
			{errorJsx}
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
				<div className={'shopping-list-edit__buttons'}>
					<Button
						disabled={statusInternal === STATUS_ERROR}
						icon={'tick'}
						large={true}
						minimal={true}
						intent={Intent.SUCCESS}
						type={'submit'}
					>{t('shopping_list_item.button_save')}</Button>
				</div>
			</form>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	const form = getShoppingForm(state)
	const products = getProducts(state)

	return {
		listId: ownProps.listId,
		t,
		status: form.status,
		error: form.error,
		products
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		submitForm: (dto) => dispatch(shoppingFormSubmit(ownProps.listId, dto, locale)),
		reset: () => dispatch(shoppingFormReset()),
		fetchProducts: () => dispatch(fetchProducts(null, locale))
	}
}

CreateShoppingListItem.propTypes = {
	item: PropTypes.object,
	itemId: PropTypes.number,
	submitForm: PropTypes.func,
	closePopover: PropTypes.func,
	className: PropTypes.string,
	i18n: PropTypes.object,
	status: PropTypes.string,
	error: PropTypes.string,
	t: PropTypes.object,
	reset: PropTypes.func,
	fetchProducts: PropTypes.func,
	products: PropTypes.object
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(CreateShoppingListItem)
