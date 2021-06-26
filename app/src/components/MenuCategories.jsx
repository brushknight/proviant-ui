import * as React from "react";
import {Button, Callout, Classes, InputGroup, Intent, Menu, MenuDivider, MenuItem, Spinner} from "@blueprintjs/core";
import {connect} from 'react-redux'
import {getCategories} from "../redux/selectors";
import {STATUS_ERROR, STATUS_LOADING} from "../redux/reducers/lists";
import {changeCreateCategoryForm, createCategory, fetchCategories} from "../redux/actions/categories";
import {useEffect} from "react";
import {MenuCreateForm} from "./MenuCreateForm";

const MenuCategories= ({categories, fetchCategories, createCategory, changeCreateCategoryForm}) => {
    useEffect(() => {
        fetchCategories()
    }, [])

    if (categories.status === STATUS_LOADING){
        return <Menu
            className={`${
                Classes.ELEVATION_0
            } page-header__navigation-list page-header__navigation-list--side-bar`}
        >
            <MenuDivider title="Lists"/>
            <Spinner/>
        </Menu>
    }

    if (categories.status === STATUS_ERROR){
        return <Menu
            className={`${
                Classes.ELEVATION_0
            } page-header__navigation-list page-header__navigation-list--side-bar`}
        >
            <MenuDivider title="Lists"/>
            <Callout title={"oops... something went wrong"} intent={Intent.DANGER}>
                {categories.error}
            </Callout>
        </Menu>
    }

    let createForm = <MenuCreateForm
        placeholder="New Category"
        icon={"tag"}
        onChange={changeCreateCategoryForm}
        onSubmit={() => {
            createCategory(categories.createForm.title)
        }
        }
    />


    if (categories.items.length === 0){
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
            <MenuItem icon="dot" key={item.id} text={item.title}/>
        ))}
    </Menu>
}

const mapStateToProps = state => {
    const categories = getCategories(state);
    return { categories };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
        createCategory: (title) => dispatch(createCategory(title)),
        changeCreateCategoryForm: (title) => dispatch(changeCreateCategoryForm(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategories);