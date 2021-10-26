import * as React from 'react'
import { Button, Callout, EditableText, FileInput, InputGroup, Intent, Tag } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createProduct, createProductFormReset } from '../../../common/redux/actions/product/createProduct'
import { fileToBase64, isImageValid } from '../../../common/utils/image'
import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST } from '../../const'
import { GA_WEB_PAGE_PRODUCT_CREATE, pageView } from '../../../common/utils/ga'
import { getCategories, getCreateProduct, getLists } from '../../../common/redux/selectors'
import { STATUS_CREATED, STATUS_DEFAULT, STATUS_EDITING, STATUS_ERROR } from '../../../common/redux/reducers/consts'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
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
		className,
		filterType,
		listOrCategoryId
	}
) => {
	const history = useHistory()
	const [error, setError] = useState('')
	const [status, setStatus] = useState('')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [link, setLink] = useState('')
	const [imageBase64, setImageBase64] = useState('')
	const [barcode, setBarcode] = useState('')
	const [list, setList] = useState(null)
	const [categoryList, setCategoryList] = useState([])
	const [price, setPrice] = useState(0)

	useEffect(() => {
		if (form.status === STATUS_DEFAULT) {
			setTitle(form.model.title)

			if (filterType === FILTER_TYPE_CATEGORY) {
				setCategoryList(categories.items.filter(c => Number(c.id) === Number(listOrCategoryId)))
			}

			if (filterType === FILTER_TYPE_LIST) {
				setList(lists.items.find(item => Number(item.id) === Number(listOrCategoryId)))
			}
		}
		setStatus(form.status)
		setError(form.error)
	}, [form.status])

	if (form.status === STATUS_CREATED) {
		const url = '/product/' + form.model.id
		reset()
		history.push(url)
	}

	const textLinkToShop = <Tag minimal={true}>{t('product_create.link_to_shop')}</Tag>
	const textBarcode = <Tag minimal={true}>{t('product_create.barcode')}</Tag>
	const textPrice = <Tag minimal={true}>{t('product_create.price')}</Tag>

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

	if (status === STATUS_ERROR) {
		errorCallout = <Callout icon={null} intent={Intent.DANGER}>{t(error)}</Callout>
	}

	const submitHandler = () => {
		createProduct({
			title,
			description,
			link,
			price,
			image_base64: imageBase64,
			barcode,
			list_id: list ? list.id : 0,
			category_ids: categoryList ? categoryList.map(item => item.id) : []
		})
	}

	const imageStyle = {
		backgroundImage: 'url(' + imageBase64 + ')'
	}

	pageView(GA_WEB_PAGE_PRODUCT_CREATE)

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
						placeholder={t('product_create.title')}
						onChange={(value) => {
							setTitle(value)
							setStatus(STATUS_EDITING)
						}}
					/>
				</h1>
				<EditableText
					className='product-edit__description'
					multiline={true}
					minLines={3}
					maxLines={100}
					value={description}
					placeholder={t('product_create.description')}
					onChange={(value) => {
						setDescription(value)
						setStatus(STATUS_EDITING)
					}}
				/>
			</div>
			<FileInput
				className='product-edit__input'
				disabled={false}
				fill={true}
				text={t('product_create.choose_picture')}
				onInputChange={(e) => {
					const file = e.target.files[0]

					if (!isImageValid(file)) {
						setError('global.error.image_not_valid')
						setStatus(STATUS_ERROR)
						return
					}

					fileToBase64(e.target.files[0]).then(base64 => setImageBase64(base64))
					setStatus(STATUS_EDITING)
				}}
			/>
			<InputGroup
				className='product-edit__input'
				fill={true}
				leftElement={textPrice}
				value={price}
				onChange={(event) => {
					setPrice(event.target.value)
					setStatus(STATUS_EDITING)
				}}
				onBlur={(e) => {
					setPrice(parseFloat(e.target.value))
					setStatus(STATUS_EDITING)
				}}
			/>
			<InputGroup
				className='product-edit__input'
				fill={true}
				leftElement={textLinkToShop}
				value={link}
				onChange={(event) => {
					setLink(event.target.value)
					setStatus(STATUS_EDITING)
				}}
			/>
			<InputGroup
				className='product-edit__input'
				fill={true}
				leftElement={textBarcode}
				value={barcode}
				onChange={(event) => {
					setBarcode(event.target.value)
					setStatus(STATUS_EDITING)
				}}
			/>
			<Select
				className='product-edit__input product-edit__input--list-select'
				options={listsForSelect}
				isMulti={false}
				placeholder={t('product_edit.select_list')}
				onChange={(event) => {
					setList(
						lists.items.find(item => item.id === event.value)
					)
					setStatus(STATUS_EDITING)
				}}
				value={list ? convertListToValue(list) : null}
			/>
			<Select
				className='product-edit__input product-edit__input--categories-select'
				options={categoriesForSelect}
				isMulti={true}
				placeholder={t('product_edit.select_categories')}
				onChange={(data) => {
					setCategoryList(data.map((item) => {
						return categories.items.find(c => c.id === item.value)
					}))
					setStatus(STATUS_EDITING)
				}}
				value={categoriesSelected}
			/>
			<Button
				disabled={status === STATUS_ERROR}
				icon={'tick'}
				large={true}
				minimal={true}
				onClick={submitHandler}
				intent={Intent.SUCCESS}
			>{t('product_edit.button_save')}</Button>

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
	className: PropTypes.string,
	listOrCategoryId: PropTypes.number,
	filterType: PropTypes.string
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ProductCreate)
