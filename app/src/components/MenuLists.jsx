import * as React from "react";
import {useEffect} from "react";
import {Callout, Classes, Intent, Menu, MenuDivider, MenuItem, Spinner} from "@blueprintjs/core";
import {connect} from 'react-redux'
import {getLists} from "../redux/selectors";
import {changeCreateListForm, createList, fetchLists} from "../redux/actions/lists";
import {STATUS_ERROR, STATUS_LOADING} from "../redux/reducers/lists";
import {MenuCreateForm} from "./MenuCreateForm";
import {useHistory} from "react-router-dom";


const MenuLists = ({lists, fetchLists, createList, changeCreateListForm}) => {
    const history = useHistory();

    useEffect(() => {
        fetchLists()
    }, [])

    let goToAllProduct = () => {
        history.push("/");
    }

    let goToList = (id) => {
        return () => {
            history.push(`/list/${id}`);
        }
    }

    if (lists.status === STATUS_LOADING) {
        return <Menu
            className={`${
                Classes.ELEVATION_0
            } page-header__navigation-list page-header__navigation-list--side-bar`}
        >
            <MenuDivider title="Lists"/>
            <Spinner/>
        </Menu>
    }

    if (lists.status === STATUS_ERROR) {
        return <Menu
            className={`${
                Classes.ELEVATION_0
            } page-header__navigation-list page-header__navigation-list--side-bar`}
        >
            <MenuDivider title="Lists"/>
            <Callout title={"oops... something went wrong"} intent={Intent.DANGER}>
                {lists.error}
            </Callout>
        </Menu>
    }


    let createForm = <MenuCreateForm
        value={lists.createForm.title}
        placeholder="New List"
        icon={"list"}
        onChange={changeCreateListForm}
        onSubmit={() => {
            createList(lists.createForm.title)
        }
        }
        status={lists.createForm.status}
        error={lists.createForm.error}
    />

    if (lists.items.length === 0) {
        return <Menu
            className={`${
                Classes.ELEVATION_0
            } page-header__navigation-list page-header__navigation-list--side-bar`}
        >
            <MenuDivider title="Lists"/>
            {createForm}
            <MenuItem icon="dot" text="All products" onClick={goToAllProduct}/>
        </Menu>
    }

    return <Menu
        className={`${
            Classes.ELEVATION_0
        } page-header__navigation-list page-header__navigation-list--side-bar`}
    >
        <MenuDivider title="Lists"/>
        {createForm}
        <MenuItem icon="dot" text="All products" onClick={goToAllProduct}/>
        {lists.items.map(item => (
            <MenuItem icon="dot" key={item.id} text={item.title} onClick={goToList(item.id)}/>
        ))}
    </Menu>
}

const mapStateToProps = state => {
    const lists = getLists(state);
    return {lists};
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLists: () => dispatch(fetchLists()),
        createList: (title) => dispatch(createList(title)),
        changeCreateListForm: (title) => dispatch(changeCreateListForm(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuLists);