import * as React from "react";
import {Classes, Menu, MenuDivider, MenuItem} from "@blueprintjs/core";

class MenuLists extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                {title: "Pharmacy"},
                {title: "Grocery"},
                {title: "House cleaning"},
                {title: "Personal hygiene"},
            ]
        };
    }

    render() {
        return (
            <Menu
                className={`${
                    Classes.ELEVATION_0
                } page-header__navigation-list page-header__navigation-list--side-bar`}
            >
                <MenuDivider title="Lists"/>
                <MenuItem icon="dot" text="All products"/>
                {this.state.items.map(item => (
                    <MenuItem icon="dot" text={item.title}/>
                ))}
            </Menu>
        );
    }
}

export default MenuLists