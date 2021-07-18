import * as React from 'react'
import { Button, Callout, EditableText, FileInput, InputGroup, Intent, Tag } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { editProductFormReset, fetchEditProduct, updateProduct } from '../../redux/actions/editProduct'
import { fileToBase64, isImageValid } from '../../utils/image'
import { getCategories, getEditProduct, getLists } from '../../redux/selectors'
import {
	STATUS_DEFAULT,
	STATUS_EDITING,
	STATUS_ERROR,
	STATUS_FETCH_FAILED,
	STATUS_FETCHED,
	STATUS_FETCHING,
	STATUS_NOT_FOUND,
	STATUS_UPDATED
} from '../../redux/reducers/consts'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import ProductsOverlayCloseButton from './ProductOverlayCloseButton'
import PropTypes from 'prop-types'
import SectionError from '../SectionError'
import SectionLoading from '../SectionLoading'
import SectionNotFound from '../SectionNotFound'
import Select from 'react-select'

const ProductEdit = (
	{
		form,
		lists,
		categories,
		productId,
		fetchProduct,
		updateProduct,
		reset,
		closePopover,
		t,
		className
	}
) => {
	useEffect(() => {
		if (form.status === STATUS_DEFAULT) {
			fetchProduct(productId)
		}

		if (form.status === STATUS_FETCHED) {
			setTitle(form.model.title)
			setDescription(form.model.description)
			setLink(form.model.link)
			setImage(form.model.image)
			setBarcode(form.model.barcode)
			setList(form.model.list)
			setCategoryList(form.model.categories)
		}

		if (form.status === STATUS_ERROR) {
			setError(form.error)
		}

		if (form.status === STATUS_NOT_FOUND) {
			setError(form.error)
		}
		setStatus(form.status)
	}, [productId, form.status])

	const [error, setError] = useState(form.error)
	const [status, setStatus] = useState(form.status)
	const [title, setTitle] = useState(form.model.title)
	const [description, setDescription] = useState(form.model.description)
	const [link, setLink] = useState(form.model.link)
	const [image, setImage] = useState(form.model.image)
	const [imageBase64, setImageBase64] = useState('')
	const [barcode, setBarcode] = useState(form.model.barcode)
	const [list, setList] = useState(form.model.list)
	const [categoryList, setCategoryList] = useState(form.model.categories)

	if (status === STATUS_FETCHING) {
		return <SectionLoading/>
	}

	if (status === STATUS_FETCH_FAILED) {
		return <SectionError error={error}/>
	}

	if (status === STATUS_NOT_FOUND) {
		return <SectionNotFound error={error} title={t('product_edit.not_found')}/>
	}

	const onCloseHandler = () => {
		closePopover()
		reset()
	}

	const textLinkToShop = <Tag minimal={true}>{t('product_edit.link_to_shop')}</Tag>
	const textBarcode = <Tag minimal={true}>{t('product_edit.barcode')}</Tag>

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

	if (categoryList != null) {
		categoriesSelected = categoryList.map((item) => {
			return convertCategoryToValue(item)
		})
	}

	let errorCallout

	if (status === STATUS_ERROR) {
		errorCallout = <Callout icon={null} intent={Intent.DANGER}>{t(error)}</Callout>
	}

	let updatedCallout

	if (status === STATUS_UPDATED) {
		updatedCallout = <Callout icon={'tick'} intent={Intent.SUCCESS}>{t('product_edit.callout_updated')}</Callout>
	}

	const submitHandler = () => {
		updateProduct({
			id: form.model.id,
			title,
			description,
			link,
			image_base64: imageBase64,
			barcode,
			list_id: list ? list.id : 0,
			category_ids: categoryList ? categoryList.map(item => item.id) : []
		})
	}

	let imageStyle

	if (imageBase64 !== '') {
		imageStyle = {
			backgroundImage: 'url(' + imageBase64 + ')'
		}
	} else {
		imageStyle = {
			backgroundImage: 'url(' + image + ')'
		}
	}

	return (
		<section className={className + ' product-edit'}>
			<ProductsOverlayCloseButton onClick={onCloseHandler}/>
			{updatedCallout}
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
						placeholder={t('product_edit.title')}
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
					placeholder={t('product_edit.description')}
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
				text={t('product_edit.choose_picture')}
				onInputChange={(e) => {
					const file = e.target.files[0]

					if (!isImageValid(file)) {
						setError('global.error.image_not_valid')
						setStatus(STATUS_ERROR)
						return
					}

					fileToBase64(file).then(base64 => setImageBase64(base64))
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
	const form = getEditProduct(state)
	const lists = getLists(state)
	const categories = getCategories(state)
	const productId = ownProps.productId
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	return { form, lists, categories, productId, t }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		fetchProduct: (id) => dispatch(fetchEditProduct(id, locale)),
		updateProduct: (model) => dispatch(updateProduct(model, locale)),
		reset: () => dispatch(editProductFormReset(locale)),
		closePopover: ownProps.closePopover
	}
}

ProductEdit.propTypes = {
	closePopover: PropTypes.func,
	fetchProduct: PropTypes.func,
	updateProduct: PropTypes.func,
	reset: PropTypes.func,
	productId: PropTypes.string,
	form: PropTypes.object,
	lists: PropTypes.object,
	categories: PropTypes.object,
	t: PropTypes.func,
	className: PropTypes.string
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ProductEdit)
