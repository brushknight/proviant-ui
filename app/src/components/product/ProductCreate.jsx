import * as React from 'react'
import { Button, Callout, EditableText, Icon, InputGroup, Intent, Tag } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createProduct, createProductFormReset } from '../../redux/actions/createProduct'
import { getCategories, getCreateProduct, getLists } from '../../redux/selectors'
import { STATUS_CREATED, STATUS_ERROR } from '../../redux/reducers/consts'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Select from 'react-select'

const ProductCreate = (
	{
		form,
		lists,
		categories,
		createProduct,
		t,
		reset,
		className
	}
) => {
	const history = useHistory()

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [link, setLink] = useState('')
	const [image, setImage] = useState('')
	const [barcode, setBarcode] = useState('')
	const [list, setList] = useState(null)
	const [categoryList, setCategoryList] = useState([])

	if (form.status === STATUS_CREATED) {
		const url = '/product/' + form.model.id
		reset()
		history.push(url)
	}

	const textLinkToShop = <Tag minimal={true}>{t('product_create.link_to_shop')}</Tag>
	const textLinkToPicture = <Tag minimal={true}>{t('product_create.link_to_picture')}</Tag>
	const textBarcode = <Tag minimal={true}>{t('product_create.barcode')}</Tag>

	const convertListToValue = (model) => {
		return { value: model.id, label: model.title }
	}

	const convertCategoryToValue = (model) => {
		return { value: model.id, label: model.title }
	}

	const listsForSelect = lists.items.map((item) => {
		return convertListToValue(item)
	})

	const categoriesForSelect = categories.items.map((item) => {
		return convertCategoryToValue(item)
	})

	let categoriesSelected = []

	if (categoryList.length !== 0) {
		categoriesSelected = categoryList.map((item) => {
			return convertCategoryToValue(item)
		})
	}

	let errorCallout

	if (form.status === STATUS_ERROR) {
		errorCallout = <Callout icon={null} intent={Intent.DANGER}>{t(form.error)}</Callout>
	}

	const submitHandler = () => {
		createProduct({
			title,
			description,
			link,
			image,
			barcode,
			list_id: list ? list.id : 0,
			category_ids: categoryList ? categoryList.map(item => item.id) : []
		})
	}

	const imageStyle = {
		backgroundImage: 'url(' + image + ')'
	}

	return (
		<section className={className + ' product-edit'}>
			{errorCallout}
			<div className='product-edit__image' style={imageStyle}>
			</div>
			<div className='product-edit__text'>
				<h1>
					<EditableText
						multiline={false}
						minLines={1}
						maxLines={1}
						value={title}
						onChange={(value) => {
							setTitle(value)
						}}
					/>
				</h1>
				<EditableText
					className='product-edit__description'
					multiline={true}
					minLines={3}
					maxLines={100}
					value={description}
					onChange={(value) => {
						setDescription(value)
					}}
				/>
			</div>
			<InputGroup className='product-edit__input'
				fill={true}
				leftElement={textLinkToShop}
				value={link}
				onChange={(event) => {
					setLink(event.target.value)
				}}
			/>
			<InputGroup className='product-edit__input'
				fill={true}
				leftElement={textLinkToPicture}
				value={image}
				onChange={(event) => {
					setImage(event.target.value)
				}}
			/>
			<InputGroup className='product-edit__input'
				fill={true}
				leftElement={textBarcode}
				value={barcode}
				onChange={(event) => {
					setBarcode(event.target.value)
				}}
			/>
			<Select className='product-edit__input product-edit__input--list-select'
				options={listsForSelect}
				isMulti={false}
				placeholder={t('product_edit.select_list')}
				onChange={(event) => {
					setList(
						lists.items.find(item => item.id === event.value)
					)
				}}
				value={list ? convertListToValue(list) : null}
			/>
			<Select className='product-edit__input product-edit__input--categories-select'
				options={categoriesForSelect}
				isMulti={true}
				placeholder={t('product_edit.select_categories')}
				onChange={(data) => {
					setCategoryList(data.map((item) => {
						return categories.items.find(c => c.id === item.value)
					}))
				}}
				value={categoriesSelected}
			/>
			<Button icon={'tick'} large={true} minimal={true} onClick={submitHandler} intent={Intent.SUCCESS}>{t('product_edit.button_save')}</Button>

		</section>
	)
}

const mapStateToProps = (state, ownProps) => {
	const form = getCreateProduct(state)
	const lists = getLists(state)
	const categories = getCategories(state)
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	return { form, lists, categories, t }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		createProduct: (model) => dispatch(createProduct(model, locale)),
		reset: () => dispatch(createProductFormReset(locale))
	}
}

ProductCreate.propTypes = {
	createProduct: PropTypes.func,
	reset: PropTypes.func,
	form: PropTypes.object,
	lists: PropTypes.object,
	categories: PropTypes.object,
	t: PropTypes.func,
	className: PropTypes.string
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ProductCreate)
