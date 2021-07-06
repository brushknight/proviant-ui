import * as React from 'react'
import { Button, ButtonGroup, Callout, EditableText, InputGroup, Intent, Tag } from '@blueprintjs/core'
import { connect } from 'react-redux'
import {
	editProductFormChangeField,
	editProductFormReset,
	fetchEditProduct,
	updateProduct
} from '../../redux/actions/editProduct'
import { getCategories, getEditProduct, getLists } from '../../redux/selectors'
import {
	PRODUCT_FIELD_BARCODE,
	PRODUCT_FIELD_CATEGORIES,
	PRODUCT_FIELD_DESCRIPTION,
	PRODUCT_FIELD_IMAGE,
	PRODUCT_FIELD_LINK,
	PRODUCT_FIELD_LIST,
	PRODUCT_FIELD_TITLE, STATUS_DEFAULT,
	STATUS_ERROR, STATUS_FETCHED,
	STATUS_FETCHING,
	STATUS_NOT_FOUND,
	STATUS_UPDATED
} from '../../redux/reducers/consts'
import { useEffect, useState } from 'react'
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
		closePopover
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
	}, [productId, form.status])

	const [title, setTitle] = useState(form.model.title)
	const [description, setDescription] = useState(form.model.description)
	const [link, setLink] = useState(form.model.link)
	const [image, setImage] = useState(form.model.image)
	const [barcode, setBarcode] = useState(form.model.barcode)
	const [list, setList] = useState(form.model.list)
	const [categoryList, setCategoryList] = useState(form.model.categories)

	if (form.status === STATUS_FETCHING) {
		return <SectionLoading/>
	}

	if (form.status === STATUS_ERROR) {
		return <SectionError error={form.error}/>
	}

	if (form.status === STATUS_NOT_FOUND) {
		return <SectionNotFound error={form.error} title={'Product not found'}/>
	}

	const onCancelHandler = () => {
		closePopover()
		reset()
	}

	const textLinkToShop = <Tag minimal={true}>Link to shop</Tag>
	const textLinkToPicture = <Tag minimal={true}>Link to picture</Tag>
	const textBarcode = <Tag minimal={true}>Barcode</Tag>

	const controls = []

	controls.push(<Button icon={'tick'} minimal={true} onClick={() => {
		updateProduct({
			id: form.model.id,
			title,
			description,
			link,
			image,
			barcode,
			list_id: list ? list.id : 0,
			category_ids: categoryList ? categoryList.map(item => item.id) : []
		})
	}} intent={Intent.SUCCESS}>Save</Button>)
	controls.push(<Button icon={'undo'} minimal={true} onClick={onCancelHandler}>Back to product</Button>)

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

	if (form.status === STATUS_ERROR) {
		errorCallout = <Callout icon={null} intent={Intent.DANGER}>{form.error}</Callout>
	}

	let updatedCallout

	if (form.status === STATUS_UPDATED) {
		updatedCallout = <Callout icon={'tick'} intent={Intent.SUCCESS}>Product updated</Callout>
	}

	return <section className="content">
		{updatedCallout}
		{errorCallout}
		<ButtonGroup>
			{controls}
		</ButtonGroup>
		<img src={image} alt={title} width={100} height={100}/>
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
			multiline={true}
			minLines={3}
			maxLines={100}
			value={description}
			onChange={(value) => {
				setDescription(value)
			}}
		/>
		<InputGroup
			fill={true}
			leftElement={textLinkToShop}
			value={link}
			onChange={(event) => {
				setLink(event.target.value)
			}}
		/>
		<InputGroup
			fill={true}
			leftElement={textLinkToPicture}
			value={image}
			onChange={(event) => {
				setImage(event.target.value)
			}}
		/>
		<InputGroup
			fill={true}
			leftElement={textBarcode}
			value={barcode}
			onChange={(event) => {
				setBarcode(event.target.value)
			}}
		/>
		<Select
			options={listsForSelect}
			isMulti={false}
			placeholder={'select list'}
			onChange={(event) => {
				setList(
					lists.items.find(item => item.id === event.value)
				)
			}}
			value={list ? convertListToValue(list) : null}
			className={'change_me-product-list-select'}
		/>
		<Select
			options={categoriesForSelect}
			isMulti={true}
			placeholder={'select categories'}
			onChange={(data) => {
				setCategoryList(data.map((item) => {
					return categories.items.find(c => c.id === item.value)
				}))
			}}
			value={categoriesSelected}
			className={'change_me-product-categories-select'}
		/>

	</section>
}

const mapStateToProps = (state, ownProps) => {
	const form = getEditProduct(state)
	const lists = getLists(state)
	const categories = getCategories(state)
	const productId = ownProps.productId
	return { form, lists, categories, productId }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchProduct: (id) => dispatch(fetchEditProduct(id)),
		updateProduct: (model) => dispatch(updateProduct(model)),
		reset: () => dispatch(editProductFormReset()),
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
	categories: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)
