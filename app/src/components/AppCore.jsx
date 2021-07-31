import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST, FILTER_TYPE_NONE } from '../const'
import { getUser } from '../redux/selectors'
import { isSaaS } from '../utils/env'
import { Route, useHistory } from 'react-router-dom'
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
import Version from './menu/Version'

const AppCore = ({ user }) => {
	const history = useHistory()

	useEffect(() => {
		if (isSaaS() && user.status === STATUS_UNAUTHORIZED) {
			history.push('/login')
			return (
				<Spinner/>
			)
		}
		if (isSaaS() && user.status !== STATUS_LOADED) {
			return (
				<Spinner/>
			)
		}
	}, [user.status])

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
