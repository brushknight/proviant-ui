import { combineReducers } from 'redux'
import apiTokenForm from './auth/apiTokenForm'
import apiTokens from './auth/apiTokens'
import categories from './categories'
import consumptionLog from './consumption/log'
import createProduct from './product/createProduct'
import editCategory from './editCategory'
import editList from './editList'
import editProduct from './product/editProduct'
import lists from './lists'
import login from './login'
import product from './product/product'
import products from './product/products'
import register from './register'
import shoppingEdit from './shopping/edit'
import shoppingForm from './shopping/form'
import shoppingList from './shopping/list'
import shoppingLists from './shopping/lists'
import stock from './stock'
import user from './user'
import version from './version'

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
	version,
	shoppingList,
	shoppingForm,
	shoppingEdit,
	shoppingLists,
	apiTokens,
	apiTokenForm
})
