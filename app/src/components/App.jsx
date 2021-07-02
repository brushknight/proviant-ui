import * as Classes from '@blueprintjs/core/lib/esnext/common/classes'
import * as React from 'react'
import { AnchorButton, Dialog, Intent } from '@blueprintjs/core'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import BreadCrumbs from './BreadCrumbs'
import MenuAddProduct from './MenuAddProduct'
import MenuCategories from './MenuCategories'
import MenuLists from './MenuLists'
import Product from './Product'
import ProductCreate from './product/ProductCreate'
import ProductEdit from './product/ProductEdit'
import ProductsList from './ProductsList'
import store from '../redux/store'

const App = () => {
  return <Router>
        <Provider store={store}>
            <React.StrictMode>
                <div className="page-body">
                    <header className="page-header">
                        <nav className="page-header__navigation">
                            <MenuAddProduct/>
                             <MenuLists/>
                             <MenuCategories/>
                            {/* <MenuSettings/> */}
                        </nav>
                    </header>
                    <main className="page-main">
                        <BreadCrumbs/>
                        <Switch>
                             <Route path="/product/:id/edit">
                                <ProductEdit/>
                             </Route>
                             <Route path="/product/new">
                                <ProductCreate/>
                             </Route>
                             <Route path="/product/:id">
                                <Product/>
                             </Route>

                             <Route path="/list/:id">
                                <ProductsList filterType={'list'}/>
                             </Route>
                             <Route path="/category/:id">
                                <ProductsList filterType={'category'}/>
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

export default App
