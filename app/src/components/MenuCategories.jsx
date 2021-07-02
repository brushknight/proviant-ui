import * as React from 'react'
import { Callout, Classes, Intent, Menu, MenuDivider, MenuItem, Spinner } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { getCategories } from '../redux/selectors'
import { STATUS_ERROR, STATUS_LOADING } from '../redux/reducers/consts'
import { changeCreateCategoryForm, createCategory, fetchCategories } from '../redux/actions/categories'
import { useEffect } from 'react'
import { MenuCreateForm } from './MenuCreateForm'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

const MenuCategories = ({ categories, fetchCategories, createCategory, changeCreateCategoryForm }) => {
  const history = useHistory()

  useEffect(() => {
    fetchCategories()
  }, [])

  const goToCategory = (id) => {
    return () => {
      history.push(`/category/${id}`)
    }
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

  const createForm = <MenuCreateForm
        placeholder="New Category"
        icon={'tag'}
        onChange={changeCreateCategoryForm}
        value={categories.createForm.title}
        onSubmit={() => {
          createCategory(categories.createForm.title)
        }
        }
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
            <MenuItem icon="dot" key={item.id} text={item.title} onClick={goToCategory(item.id)}/>
        ))}
    </Menu>
}

MenuCategories.propTypes = {
  categories: PropTypes.object,
  fetchCategories: PropTypes.func,
  createCategory: PropTypes.func,
  changeCreateCategoryForm: PropTypes.func
}

const mapStateToProps = state => {
  const categories = getCategories(state)
  return { categories }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    createCategory: (title) => dispatch(createCategory(title)),
    changeCreateCategoryForm: (title) => dispatch(changeCreateCategoryForm(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategories)
