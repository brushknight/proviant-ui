import * as React from 'react'
import { Button, ButtonGroup, Callout, EditableText, InputGroup, Intent, Tag } from '@blueprintjs/core'
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

const ProductCreate = ({
												 form,
												 lists,
												 categories,
												 createProduct,
												 reset
											 }) => {
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

	const textLinkToShop = <Tag minimal={true}>Link to shop</Tag>
	const textLinkToPicture = <Tag minimal={true}>Link to picture</Tag>
	const textBarcode = <Tag minimal={true}>Barcode</Tag>

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
		errorCallout = <Callout icon={null} intent={Intent.DANGER}>{form.error}</Callout>
	}

	const controls = []

	controls.push(<Button icon={'tick'} minimal={true} onClick={() => {
		createProduct({
			title,
			description,
			link,
			image,
			barcode,
			list_id: list ? list.id : 0,
			category_ids: categoryList ? categoryList.map(item => item.id) : []
		})
	}} intent={Intent.SUCCESS}>save new product</Button>)

	return <section className="content">
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
	const form = getCreateProduct(state)
	const lists = getLists(state)
	const categories = getCategories(state)
	return { form, lists, categories }
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
	categories: PropTypes.object
}

export default compose(withTranslation('translation'), connect(mapStateToProps, mapDispatchToProps))(ProductCreate)
