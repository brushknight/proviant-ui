import { combineReducers } from 'redux'
import apiTokenForm from './auth/apiTokenForm'
import apiTokens from './auth/apiTokens'
import categories from './category/categories'
import consumptionLog from './consumption/log'
import createProduct from './product/createProduct'
import editCategory from './category/editCategory'
import editList from './list/editList'
import editProduct from './product/editProduct'
import feedbackForm from './feedback/form'
import lists from './list/lists'
import login from './login'
import product from './product/product'
import products from './product/products'
import register from './register'
import shoppingEdit from './shopping/edit'
import shoppingForm from './shopping/form'
import shoppingList from './shopping/list'
import shoppingLists from './shopping/lists'
import stock from './stock/stock'
import user from './user'
import version from './version'
import userSettings from './userSettings'

export default combineReducers({
	lists,
	categories,
	products,
	product,
	editProduct,
	createProduct,
	editCategory,
	editList,
	stock,
	consumptionLog,
	login,
	register,
	user,
	userSettings,
	version,
	shoppingList,
	shoppingForm,
	shoppingEdit,
	shoppingLists,
	apiTokens,
	apiTokenForm,
	feedbackForm
})
