import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import BreadCrumbs from './BreadCrumbs'
import CategoryEditForm from './category/CategoryEditForm'
import MenuAddProduct from './MenuAddProduct'
import MenuCategories from './menu/MenuCategories'
import MenuLists from './menu/MenuLists'
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
								<Route path="/category/:id/edit">
									<CategoryEditForm/>
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
