import { hot } from 'react-hot-loader/root';
import * as React from "react";
import {Provider} from 'react-redux'
import store from "../redux/store";
import MenuLists from "./MenuLists";
import MenuCategories from "./MenuCategories";
import MenuSettings from "./MenuSettings";
import BreadCrumbs from "./BreadCrumbs";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Product from "./Product";
import ProductsList from "./ProductsList";

const App = () => {
    return <Router>
        <Provider store={store}>
            <React.StrictMode>
                <div className="page-body">
                    <header className="page-header">
                        <nav className="page-header__navigation">
                            <MenuLists/>
                            <MenuCategories/>
                            <MenuSettings/>
                        </nav>
                    </header>

                    <main className="page-main">
                        <BreadCrumbs/>
                        <Switch>
                            <Route path="/product/:id">
                                <Product/>
                            </Route>
                            <Route path="/">
                                <ProductsList/>
                            </Route>
                        </Switch>
                    </main>
                </div>
            </React.StrictMode>
        </Provider>
    </Router>
}

export default hot(App);