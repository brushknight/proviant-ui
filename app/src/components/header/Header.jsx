import * as React from 'react'
import Navigation from "../menu/Navigation";
import Profile from "./Profile";
import Search from "./Search";
import AddProductForm from "./AddProductForm";
import Overlay from "../generic/Overlay";

const PageHeader = () => {
    return (
        <header className={'page-header'}>
            <Navigation/>
            <Search/>
            <Profile/>
            <AddProductForm/>
            <Overlay/>
        </header>
    )
}

export default PageHeader