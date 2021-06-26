import * as React from "react";
import {Button, Callout, Classes, InputGroup, Intent, Menu, MenuDivider, MenuItem, Spinner} from "@blueprintjs/core";
import {connect} from 'react-redux'
import {getLists} from "../redux/selectors";
import {useEffect} from "react";
import {fetchLists} from "../redux/actions/lists";
import {STATUS_ERROR, STATUS_LOADING} from "../redux/reducers/lists";


const MenuListAddForm = () => {

    const addButton = (
        <Button
            minimal={true}
            icon="plus"
        />
    )

    return <div>
        <InputGroup
            placeholder="New List"
            rightElement={addButton}
            leftIcon={"list"}
            />
    </div>
}

const MenuLists = ({lists, fetchLists}) => {
    useEffect(() => {
        fetchLists()
    }, [])


    if (lists.status === STATUS_LOADING){
        return <Menu
            className={`${
                Classes.ELEVATION_0
            } page-header__navigation-list page-header__navigation-list--side-bar`}
        >
            <MenuDivider title="Lists"/>
            <Spinner/>
        </Menu>
    }

    if (lists.status === STATUS_ERROR){
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

    if (lists.items.length === 0){
        return <Menu
            className={`${
                Classes.ELEVATION_0
            } page-header__navigation-list page-header__navigation-list--side-bar`}
        >
            <MenuDivider title="Lists"/>
            <MenuListAddForm/>
            <MenuItem icon="dot" text="All products"/>
        </Menu>
    }

    return <Menu
        className={`${
            Classes.ELEVATION_0
        } page-header__navigation-list page-header__navigation-list--side-bar`}
    >
        <MenuDivider title="Lists"/>
        <MenuListAddForm/>
        <MenuItem icon="dot" text="All products"/>
        {lists.items.map(item => (
            <MenuItem icon="dot" key={item.id} text={item.title}/>
        ))}
    </Menu>
}

const mapStateToProps = state => {
    const lists = getLists(state);
    return { lists };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLists: () => dispatch(fetchLists())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuLists);