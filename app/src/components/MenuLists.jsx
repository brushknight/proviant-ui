import * as React from "react";
import {Classes, Menu, MenuDivider, MenuItem} from "@blueprintjs/core";
import {useSelector, useDispatch, connect} from 'react-redux'
import {getLists} from "../redux/selectors";

// https://react-redux.js.org/tutorials/connect

const MenuLists = ({lists}) => {
    return <Menu
        className={`${
            Classes.ELEVATION_0
        } page-header__navigation-list page-header__navigation-list--side-bar`}
    >
        <MenuDivider title="Lists"/>
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


export default connect(mapStateToProps)(MenuLists);