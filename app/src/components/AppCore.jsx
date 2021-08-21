import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST, FILTER_TYPE_NONE } from '../const'
import { getUser } from '../redux/selectors'
import { isSaaS } from '../utils/env'
import { Route, useHistory, useLocation } from 'react-router-dom'
import { Spinner } from '@blueprintjs/core'
import { STATUS_LOADED, STATUS_UNAUTHORIZED } from '../redux/reducers/consts'
import { useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import CategoryCreateOverlay from './category/CategoryCreateOverlay'
import CategoryEditOverlay from './category/CategoryEditOverlay'
import ListCreateOverlay from './list/ListCreateOverlay'
import ListEditOverlay from './list/ListEditOverlay'
import MenuAddProduct from './menu/MenuAddProduct'
import MenuCategories from './menu/MenuCategories'
import MenuLists from './menu/MenuLists'
import MenuSettings from './menu/MenuSettings'
import ProductCreateOverlay from './product/ProductCreateOverlay'
import ProductEditOverlay from './product/ProductEditOverlay'
import ProductOverlay from './product/ProductOverlay'
import ProductsList from './product/ProductsList'
import PropTypes from 'prop-types'
import Sandbox from './Sandbox'
import Version from './generic/Version'
import ShoppingList from "./shopping/ShoppingList";

const AppCore = ({ user }) => {
	const history = useHistory()
	const location = useLocation()

	useEffect(() => {
		console.log(user.status)
		if (isSaaS() && user.status === STATUS_UNAUTHORIZED) {
			const uri = location.pathname

			if (!(uri === '/login' || uri === '/register' || uri === '/finish-auth')) {
				console.log("redirect to /login")
				history.push('/login')
			}
		}
	}, [user.status])

	if (isSaaS() && user.status !== STATUS_LOADED) {
		return (
			<Spinner/>
		)
	}

	return (
		<div className="page-body">

			<header className="page-header">
				<nav className="page-header__navigation">
					<MenuAddProduct/>
					<MenuLists/>
					<MenuCategories/>
					{isSaaS() &&
					<MenuSettings/>
					}
					<Version/>
				</nav>
			</header>
			<main className="page-main">

				<Route path='/sandbox'>
					<Sandbox/>
				</Route>
				<Route exact={true} path='/shopping/:id'>
					<ShoppingList/>
				</Route>
				<Route exact={true} path={["/", "/category-new", "/list-new", "/product-new", "/product-edit/:productId", "/product/:productId"]}>
					<ProductsList filterType={FILTER_TYPE_NONE}/>
					<Route exact={true} path="/category-new">
						<CategoryCreateOverlay/>
					</Route>
					<Route exact={true} path="/list-new">
						<ListCreateOverlay/>
					</Route>
					<Route exact={true} path="/product-new">
						<ProductCreateOverlay filterType={FILTER_TYPE_NONE}/>
					</Route>
					<Route exact={true} path="/product-edit/:productId/">
						<ProductEditOverlay filterType={FILTER_TYPE_NONE}/>
					</Route>
					<Route exact={true} path="/product/:productId">
						<ProductOverlay filterType={FILTER_TYPE_NONE}/>
					</Route>
				</Route>
				<Route exact={true} path={["/list/:id", "/list/:id/product-new", "/list/:id/edit", "/list/:id/product-edit/:productId", "/list/:id/product/:productId"]}>
					<ProductsList filterType={FILTER_TYPE_LIST}/>
					<Route exact={true} path="/list/:id/product-new">
						<ProductCreateOverlay filterType={FILTER_TYPE_LIST}/>
					</Route>
					<Route exact={true} path="/list/:id/edit">
						<ListEditOverlay/>
					</Route>
					<Route exact={true} path="/list/:id/product-edit/:productId">
						<ProductEditOverlay filterType={FILTER_TYPE_LIST}/>
					</Route>
					<Route exact={true} path="/list/:id/product/:productId">
						<ProductOverlay filterType={FILTER_TYPE_LIST}/>
					</Route>
				</Route>
				<Route exact={true} path={["/category/:id", "/category/:id/product-new", "/category/:id/edit", "/category/:id/product-edit/:productId", "/category/:id/product/:productId"]}>
					<ProductsList filterType={FILTER_TYPE_CATEGORY}/>
					<Route exact={true} path="/category/:id/product-new">
						<ProductCreateOverlay filterType={FILTER_TYPE_CATEGORY}/>
					</Route>
					<Route exact={true} path="/category/:id/edit">
						<CategoryEditOverlay/>
					</Route>
					<Route exact={true} path="/category/:id/product-edit/:productId">
						<ProductEditOverlay filterType={FILTER_TYPE_CATEGORY}/>
					</Route>
					<Route exact={true} path="/category/:id/product/:productId">
						<ProductOverlay filterType={FILTER_TYPE_CATEGORY}/>
					</Route>
				</Route>
			</main>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const user = getUser(state)
	return { user }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

AppCore.propTypes = {
	user: PropTypes.object
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(AppCore)
