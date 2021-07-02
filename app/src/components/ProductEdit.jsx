import * as React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCategories, getEditProduct, getLists } from '../redux/selectors'
import { Button, ButtonGroup, Callout, EditableText, InputGroup, Intent, Tag } from '@blueprintjs/core'
import { useHistory, useParams } from 'react-router-dom'
import {
  PRODUCT_FIELD_BARCODE,
  PRODUCT_FIELD_CATEGORIES,
  PRODUCT_FIELD_DESCRIPTION,
  PRODUCT_FIELD_IMAGE,
  PRODUCT_FIELD_LINK,
  PRODUCT_FIELD_LIST,
  PRODUCT_FIELD_TITLE,
  STATUS_ERROR,
  STATUS_FETCHING,
  STATUS_NOT_FOUND,
  STATUS_UPDATED
} from '../redux/reducers/consts'
import Select from 'react-select'
import SectionError from './SectionError'
import SectionNotFound from './SectionNotFound'
import SectionLoading from './SectionLoading'
import { editProductFormChangeField, fetchEditProduct, updateProduct } from '../redux/actions/editProduct'
import PropTypes from 'prop-types'

const ProductEdit = ({
  form,
  lists,
  categories,
  fetchProduct,
  updateProduct,
  change
}) => {
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    fetchProduct(id)
  }, [id])

  // eslint-disable-next-line react/prop-types
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
    history.push('/product/' + form.model.id)
  }

  const textLinkToShop = <Tag minimal={true}>Link to shop</Tag>
  const textLinkToPicture = <Tag minimal={true}>Link to picture</Tag>
  const textBarcode = <Tag minimal={true}>Barcode</Tag>

  const controls = []

  controls.push(<Button icon={'tick'} minimal={true} onClick={() => {
    updateProduct(form.model)
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

  if (form.model.categories != null) {
    categoriesSelected = form.model.categories.map((item) => {
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

const mapStateToProps = (state) => {
  const form = getEditProduct(state)
  const lists = getLists(state)
  const categories = getCategories(state)
  return { form, lists, categories }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: (id) => dispatch(fetchEditProduct(id)),
    updateProduct: (model) => dispatch(updateProduct(model)),
    change: {
      title: (value) => dispatch(editProductFormChangeField(PRODUCT_FIELD_TITLE, value)),
      description: (value) => dispatch(editProductFormChangeField(PRODUCT_FIELD_DESCRIPTION, value)),
      barcode: (value) => dispatch(editProductFormChangeField(PRODUCT_FIELD_BARCODE, value)),
      link: (value) => dispatch(editProductFormChangeField(PRODUCT_FIELD_LINK, value)),
      image: (value) => dispatch(editProductFormChangeField(PRODUCT_FIELD_IMAGE, value)),
      list: (value) => dispatch(editProductFormChangeField(PRODUCT_FIELD_LIST, value)),
      categories: (value) => dispatch(editProductFormChangeField(PRODUCT_FIELD_CATEGORIES, value))
    }
  }
}

ProductEdit.propTypes = {
  fetchProduct: PropTypes.func,
  updateProduct: PropTypes.func,
  change: PropTypes.object,
  form: PropTypes.object,
  lists: PropTypes.object,
  categories: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)
