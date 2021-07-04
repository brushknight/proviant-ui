import * as React from 'react'
import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST } from '../const'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import BreadCrumbs from './BreadCrumbs'
import CategoryEditForm from './category/CategoryEditForm'
import ListEditForm from './list/ListEditForm'
import MenuAddProduct from './menu/MenuAddProduct'
import MenuCategories from './menu/MenuCategories'
import MenuLists from './menu/MenuLists'
import Product from './product/Product'
import ProductCreate from './product/ProductCreate'
import ProductEdit from './product/ProductEdit'
import ProductOverlay from './product/ProductOverlay'
import ProductsList from './product/ProductsList'
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
							<Route path="/product/:productId">
								<Product/>
							</Route>

							<Route path="/list/:id">
								<ProductsList filterType={FILTER_TYPE_LIST}/>
								<Route path="/list/:id/edit">
									<ListEditForm/>
								</Route>
								<Route path="/list/:id/product/:productId">
									<ProductOverlay filterType={FILTER_TYPE_LIST}/>
								</Route>
							</Route>
							<Route path="/category/:id">
								<ProductsList filterType={FILTER_TYPE_CATEGORY}/>
								<Route path="/category/:id/edit">
									<CategoryEditForm/>
								</Route>
								<Route path="/category/:id/product/:productId">
									<ProductOverlay filterType={FILTER_TYPE_CATEGORY}/>
								</Route>
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
