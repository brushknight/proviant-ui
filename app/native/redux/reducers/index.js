import { combineReducers } from 'redux'

import shoppingEdit from './shopping/edit'
import shoppingForm from './shopping/form'
import shoppingList from './shopping/list'
import shoppingLists from './shopping/lists'

export default combineReducers({
	shoppingList,
	shoppingForm,
	shoppingEdit,
	shoppingLists
})
