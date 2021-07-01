import * as React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCategories, getCreateProduct, getLists } from '../redux/selectors'
import { Button, ButtonGroup, Callout, EditableText, InputGroup, Intent, Tag } from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'
import {
  PRODUCT_FIELD_BARCODE,
  PRODUCT_FIELD_CATEGORIES,
  PRODUCT_FIELD_DESCRIPTION,
  PRODUCT_FIELD_IMAGE,
  PRODUCT_FIELD_LINK,
  PRODUCT_FIELD_LIST,
  PRODUCT_FIELD_TITLE,
  STATUS_CREATED,
  STATUS_ERROR
} from '../redux/reducers/consts'
import Select from 'react-select'
import { createProduct, createProductFormChangeField, createProductFormReset } from '../redux/actions/createProduct'

const ProductCreate = ({
  form,
  lists,
  categories,
  createProduct,
  resetProduct,
  change
}) => {
  const history = useHistory()

  useEffect(() => {
    resetProduct()
  }, [])

  if (form.status === STATUS_CREATED) {
    history.push('/product/' + form.model.id)
  }

  const textLinkToShop = <Tag minimal={true}>Link to shop</Tag>
  const textLinkToPicture = <Tag minimal={true}>Link to picture</Tag>
  const textBarcode = <Tag minimal={true}>Barcode</Tag>

  const controls = []

  controls.push(<Button icon={'tick'} minimal={true} onClick={() => {
    createProduct(form.model)
  }} intent={Intent.SUCCESS}>save new product</Button>)

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

  if (form.model.categories != null) {
    categoriesSelected = form.model.categories.map((item) => {
      return convertCategoryToValue(item)
    })
  }

  let errorCallout

  if (form.status === STATUS_ERROR) {
    errorCallout = <Callout icon={null} intent={Intent.DANGER}>{form.error}</Callout>
  }

  return <section className="content">
        {errorCallout}
        <ButtonGroup>
            {controls}
        </ButtonGroup>
        <img src={form.model.image} alt={form.model.title} width={100} height={100}/>
        <h1>
            <EditableText
                multiline={false}
                minLines={1}
                maxLines={1}
                value={form.model.title}
                onChange={(value) => {
                  change.title(value)
                }}
            />
        </h1>
        <EditableText
            multiline={true}
            minLines={3}
            maxLines={100}
            value={form.model.description}
            onChange={(value) => {
              change.description(value)
            }}
        />
        <InputGroup
            fill={true}
            leftElement={textLinkToShop}
            value={form.model.link}
            onChange={(event) => {
              change.link(event.target.value)
            }}
        />
        <InputGroup
            fill={true}
            leftElement={textLinkToPicture}
            value={form.model.image}
            onChange={(event) => {
              change.image(event.target.value)
            }}
        />
        <InputGroup
            fill={true}
            leftElement={textBarcode}
            value={form.model.barcode}
            onChange={(event) => {
              change.barcode(event.target.value)
            }}
        />
        <Select
            options={listsForSelect}
            isMulti={false}
            placeholder={'select list'}
            onChange={(event) => {
              change.list(
                lists.items.find(item => item.id === event.value)
              )
            }}
            value={form.model.list ? convertListToValue(form.model.list) : null}
            className={'change_me-product-list-select'}
        />
        <Select
            options={categoriesForSelect}
            isMulti={true}
            placeholder={'select categories'}
            onChange={(data) => {
              change.categories(
                data.map((item) => {
                  return categories.items.find(c => c.id === item.value)
                })
              )
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
  const formType = ownProps.type
  return { formType, form, lists, categories }
}

const mapDispatchToProps = dispatch => {
  return {
    createProduct: (model) => dispatch(createProduct(model)),
    resetProduct: () => dispatch(createProductFormReset()),
    change: {
      title: (value) => dispatch(createProductFormChangeField(PRODUCT_FIELD_TITLE, value)),
      description: (value) => dispatch(createProductFormChangeField(PRODUCT_FIELD_DESCRIPTION, value)),
      barcode: (value) => dispatch(createProductFormChangeField(PRODUCT_FIELD_BARCODE, value)),
      link: (value) => dispatch(createProductFormChangeField(PRODUCT_FIELD_LINK, value)),
      image: (value) => dispatch(createProductFormChangeField(PRODUCT_FIELD_IMAGE, value)),
      list: (value) => dispatch(createProductFormChangeField(PRODUCT_FIELD_LIST, value)),
      categories: (value) => dispatch(createProductFormChangeField(PRODUCT_FIELD_CATEGORIES, value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate)
