import * as React from "react";
import {Classes, Menu, MenuDivider, MenuItem} from "@blueprintjs/core";

class MenuSettings extends React.Component {
    render() {
        return (
            <Menu
                className={`${
                    Classes.ELEVATION_0
                } page-header__navigation-list page-header__navigation-list--menu-bottom`}
            >
                <MenuItem icon="cog" text="Settings" />
            </Menu>
        );
    }
}

export default MenuSettings