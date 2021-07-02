import * as React from 'react'
import { Callout, Classes, Intent, Menu, MenuDivider, Spinner } from '@blueprintjs/core'
import {
  changeCreateCategoryForm,
  createCategory,
  fetchCategories,
  resetCreateCategoryForm
} from '../redux/actions/categories'
import { connect } from 'react-redux'
import { CreateForm } from './menu/CreateForm'
import { getCategories } from '../redux/selectors'
import { STATUS_ERROR, STATUS_LOADING } from '../redux/reducers/consts'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Item from './menu/Item'
import PropTypes from 'prop-types'

const MenuCategories = ({ categories, fetchCategories, createCategory, resetCreateCategoryForm }) => {
  const history = useHistory()

  useEffect(() => {
    fetchCategories()
  }, [])

  const goToCategory = (id) => {
    history.push(`/category/${id}`)
  }

  if (categories.status === STATUS_LOADING) {
    return <Menu
            className={`${
                Classes.ELEVATION_0
            } page-header__navigation-list page-header__navigation-list--side-bar`}
        >
            <MenuDivider title="Categories"/>
            <Spinner/>
        </Menu>
  }

  if (categories.status === STATUS_ERROR) {
    return <Menu
            className={`${
                Classes.ELEVATION_0
            } page-header__navigation-list page-header__navigation-list--side-bar`}
        >
            <MenuDivider title="Categories"/>
            <Callout title={'oops... something went wrong'} intent={Intent.DANGER}>
                {categories.error}
            </Callout>
        </Menu>
  }

  const createForm = <CreateForm
        placeholder="New Category"
        icon={'tag'}
        onSubmit={(title) => createCategory(title)}
        onReset={() => resetCreateCategoryForm() }
        status={categories.createForm.status}
        error={categories.createForm.error}
    />

  if (categories.items.length === 0) {
    return <Menu
            className={`${
                Classes.ELEVATION_0
            } page-header__navigation-list page-header__navigation-list--side-bar`}
        >
            <MenuDivider title="Categories"/>
            {createForm}
        </Menu>
  }

  return <Menu
        className={`${
            Classes.ELEVATION_0
        } page-header__navigation-list page-header__navigation-list--side-bar`}
    >
        <MenuDivider title="Categories"/>
        {createForm}
        {categories.items.map(item => (
          <Item
            key={item.id}
            icon="dot"
            text={item.title}
            onClick={() => goToCategory(item.id) }
            button={{
              icon: 'edit',
              action: () => {
                console.log(item.id)
              }
            }}
          />
        ))}
    </Menu>
}

MenuCategories.propTypes = {
  categories: PropTypes.object,
  fetchCategories: PropTypes.func,
  createCategory: PropTypes.func,
  resetCreateCategoryForm: PropTypes.func
}

const mapStateToProps = state => {
  const categories = getCategories(state)
  return { categories }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    createCategory: (title) => dispatch(createCategory(title)),
    resetCreateCategoryForm: () => dispatch(resetCreateCategoryForm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategories)
