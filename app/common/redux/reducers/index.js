import { combineReducers } from 'redux'
import apiTokenForm from './auth/apiTokenForm'
import apiTokens from './auth/apiTokens'
import categories from './categories'
import createProduct from './createProduct'
import editCategory from './editCategory'
import editList from './editList'
import editProduct from './editProduct'
import lists from './lists'
import login from './login'
import product from './product'
import products from './products'
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
