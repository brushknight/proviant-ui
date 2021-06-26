import * as React from "react";
import {Classes, Menu, MenuDivider, MenuItem} from "@blueprintjs/core";
import {useSelector, useDispatch, connect} from 'react-redux'
import {getCategories} from "../redux/selectors";

// https://react-redux.js.org/tutorials/connect

const MenuCategories= ({categories}) => {
    return <Menu
        className={`${
            Classes.ELEVATION_0
        } page-header__navigation-list page-header__navigation-list--side-bar`}
    >
        <MenuDivider title="Categories"/>
        {categories.items.map(item => (
            <MenuItem icon="dot" key={item.id} text={item.title}/>
        ))}
    </Menu>
}

const mapStateToProps = state => {
    const categories = getCategories(state);
    return { categories };
};


export default connect(mapStateToProps)(MenuCategories);