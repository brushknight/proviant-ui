import { getCookie } from '../utils/cookies'
import { STATUS_DEFAULT, STATUS_LOADED } from './reducers/consts'

export const getLists = store => store.lists
export const getCategories = store => store.categories
export const getEditCategory = store => store.editCategory
export const getEditList = store => store.editList
export const getProducts = store => store.products
export const getProduct = store => store.product
export const getEditProduct = store => store.editProduct
export const getCreateProduct = store => store.createProduct
export const getStock = store => store.stock
export const getConsumptionLog = store => store.consumptionLog
export const getLogin = store => store.login
export const getUser = store => store.user
export const getShoppingList = store => store.shoppingList
export const getShoppingLists = store => store.shoppingLists
export const getShoppingListItem = (store, itemId) => {
	if (store.shoppingList.status === STATUS_LOADED || store.shoppingList.status === STATUS_DEFAULT) {
		return store.shoppingList.model.items.find((item) => {
			return Number(item.id) === Number(itemId)
		})
	}

	return null
}
export const getShoppingListEdit = store => store.shoppingEdit

export const getShoppingForm = store => store.shoppingForm
export const getRegister = store => store.register
export const getVersion = store => store.version
export const getApiTokens = store => store.apiTokens
export const getApiTokenForm = store => store.apiTokenForm
export const getLocale = (store) => {
	if (store.user.model && store.user.model.locale) {
		return store.user.model.locale
	}
	return getCookie('user-locale')
}
