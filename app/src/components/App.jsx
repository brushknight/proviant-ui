import * as React from 'react'
import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST, FILTER_TYPE_NONE } from '../const'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CategoryCreateOverlay from './category/CategoryCreateOverlay'
import CategoryEditOverlay from './category/CategoryEditOverlay'
import ListCreateOverlay from './list/ListCreateOverlay'
import ListEditOverlay from './list/ListEditOverlay'
import Login from './user/Login'
import MenuAddProduct from './menu/MenuAddProduct'
import MenuCategories from './menu/MenuCategories'
import MenuLists from './menu/MenuLists'
import MenuSettings from './menu/MenuSettings'
import ProductCreateOverlay from './product/ProductCreateOverlay'
import ProductEditOverlay from './product/ProductEditOverlay'
import ProductOverlay from './product/ProductOverlay'
import ProductsList from './product/ProductsList'
import Sandbox from './Sandbox'
import store from '../redux/store'

const App = () => {
	return (
		<Router>
			<Provider store={store}>
				<React.StrictMode>
					<div className="page-body">
						<Login/>
						<header className="page-header">
							<nav className="page-header__navigation">
								<MenuAddProduct/>
								<MenuLists/>
								<MenuCategories/>
								<MenuSettings/>
							</nav>
						</header>
						<main className="page-main">
							<Switch>
								<Route path='/sandbox'>
									<Sandbox/>
								</Route>
								<Route path="/list/:id">
									<ProductsList filterType={FILTER_TYPE_LIST}/>
									<Route path="/list/:id/product-new">
										<ProductCreateOverlay filterType={FILTER_TYPE_LIST}/>
									</Route>
									<Route path="/list/:id/edit">
										<ListEditOverlay/>
									</Route>
									<Route path="/list/:id/product-edit/:productId">
										<ProductEditOverlay filterType={FILTER_TYPE_LIST}/>
									</Route>
									<Route path="/list/:id/product/:productId">
										<ProductOverlay filterType={FILTER_TYPE_LIST}/>
									</Route>
								</Route>
								<Route path="/category/:id">
									<ProductsList filterType={FILTER_TYPE_CATEGORY}/>
									<Route path="/category/:id/product-new">
										<ProductCreateOverlay filterType={FILTER_TYPE_CATEGORY}/>
									</Route>
									<Route path="/category/:id/edit">
										<CategoryEditOverlay/>
									</Route>
									<Route path="/category/:id/product-edit/:productId">
										<ProductEditOverlay filterType={FILTER_TYPE_CATEGORY}/>
									</Route>
									<Route path="/category/:id/product/:productId">
										<ProductOverlay filterType={FILTER_TYPE_CATEGORY}/>
									</Route>
								</Route>
								<Route path="/">
									<ProductsList filterType={FILTER_TYPE_NONE}/>
									<Route path="/category-new">
										<CategoryCreateOverlay/>
									</Route>
									<Route path="/list-new">
										<ListCreateOverlay/>
									</Route>
									<Route path="/product-new">
										<ProductCreateOverlay filterType={FILTER_TYPE_NONE}/>
									</Route>
									<Route path="/product-edit/:productId/">
										<ProductEditOverlay filterType={FILTER_TYPE_NONE}/>
									</Route>
									<Route path="/product/:productId">
										<ProductOverlay filterType={FILTER_TYPE_NONE}/>
									</Route>
								</Route>
							</Switch>
						</main>
					</div>
				</React.StrictMode>
			</Provider>
		</Router>
	)
}

export default App
