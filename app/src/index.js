import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MenuLists from "./components/MenuLists";
import MenuCategories from "./components/MenuCategories";
import MenuSettings from "./components/MenuSettings";
import BreadCrumbs from "./components/BreadCrumbs";
import ProductsList from "./components/ProductsList";

import './style/main.less';
import Product from "./components/Product";


ReactDOM.render(
    <Router>
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
                            <Route path="/product">
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
    </Router>,
    document.getElementById('root')
);
