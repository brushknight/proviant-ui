// stock

export const ACTION_FETCH_STOCK_SUCCESS = 'fetch/stock/success'
export const ACTION_FETCH_STOCK_FAIL = 'fetch/stock/fail'
export const ACTION_FETCH_STOCK_LOADING = 'fetch/stock/loading'
export const ACTION_FETCH_STOCK_NOT_FOUND = 'fetch/stock/not_found'

export const ACTION_ADD_STOCK_SUCCESS = 'add/stock/success'
export const ACTION_ADD_STOCK_LOADING = 'add/stock/loading'
export const ACTION_ADD_STOCK_FAIL = 'add/stock/fail'

export const ACTION_CONSUME_STOCK_SUCCESS = 'consume/stock/success'
export const ACTION_CONSUME_STOCK_LOADING = 'consume/stock/loading'
export const ACTION_CONSUME_STOCK_FAIL = 'consume/stock/fail'

export const ACTION_DELETE_STOCK_SUCCESS = 'delete/stock/success'
export const ACTION_DELETE_STOCK_LOADING = 'delete/stock/loading'
export const ACTION_DELETE_STOCK_FAIL = 'delete/stock/fail'

// categories

export const ACTION_FETCH_CATEGORIES_SUCCESS = 'fetch/categories/success'
export const ACTION_FETCH_CATEGORIES_FAIL = 'fetch/categories/fail'
export const ACTION_FETCH_CATEGORIES_LOADING = 'fetch/categories/loading'
export const ACTION_UPDATE_CATEGORY_IN_LIST = 'update/category/in_list'

export const ACTION_CREATE_CATEGORY_SUCCESS = 'create/category/success'
export const ACTION_CREATE_CATEGORY_RESET = 'create/category/reset'
export const ACTION_CREATE_CATEGORY_FAIL = 'create/category/fail'
export const ACTION_CREATE_CATEGORY_LOADING = 'create/category/loading'
// lists

export const ACTION_FETCH_LIST_SUCCESS = 'fetch/list/success'
export const ACTION_FETCH_LIST_FAIL = 'fetch/list/fail'
export const ACTION_FETCH_LIST_LOADING = 'fetch/list/loading'

export const ACTION_CREATE_LIST_SUCCESS = 'create/list/success'
export const ACTION_CREATE_LIST_FAIL = 'create/list/fail'
export const ACTION_CREATE_LIST_LOADING = 'create/list/loading'
export const ACTION_CREATE_LIST_RESET = 'create/list/reset'
export const ACTION_UPDATE_LIST_IN_LIST = 'update/list/in_list'

// product

export const ACTION_FETCH_PRODUCT_SUCCESS = 'fetch/product/success'
export const ACTION_FETCH_PRODUCT_FAIL = 'fetch/product/fail'
export const ACTION_FETCH_PRODUCT_NOT_FOUND = 'fetch/product/not_found'
export const ACTION_FETCH_PRODUCT_LOADING = 'fetch/product/loading'

export const ACTION_EDIT_PRODUCT_FETCHING = 'update/product/fetching'
export const ACTION_EDIT_PRODUCT_FETCHED = 'update/product/fetched'
export const ACTION_EDIT_PRODUCT_SENDING = 'update/product/sending'
export const ACTION_EDIT_PRODUCT_SUCCESS = 'update/product/success'
export const ACTION_EDIT_PRODUCT_FAIL = 'update/product/fail'
export const ACTION_EDIT_PRODUCT_FETCH_FAIL = 'update/product/fetch_fail'
export const ACTION_EDIT_PRODUCT_RESET = 'update/product/reset'

export const ACTION_CREATE_PRODUCT_SUCCESS = 'create/product/success'
export const ACTION_CREATE_PRODUCT_SENDING = 'create/product/sending'
export const ACTION_CREATE_PRODUCT_FAIL = 'create/product/fail'

export const ACTION_CREATE_PRODUCT_RESET = 'reset/product/create'

export const ACTION_DELETE_PRODUCT_LOADING = 'delete/product/loading'
export const ACTION_DELETE_PRODUCT_SUCCESS = 'delete/product/success'
export const ACTION_DELETE_PRODUCT_FAIL = 'delete/product/fail'

export const ACTION_RESET_PRODUCT = 'reset/product'
export const ACTION_UPDATE_PRODUCT_STOCK = 'update/product/stock'
export const ACTION_AMEND_PRODUCT_STOCK = 'amend/product/stock'
export const ACTION_UPDATE_PRODUCT_STOCK_IN_LIST = 'update/product/stock_in_list'
export const ACTION_AMEND_PRODUCT_STOCK_IN_LIST = 'amend/product/stock_in_list'

// products

export const ACTION_FETCH_PRODUCTS_SUCCESS = 'fetch/products/success'
export const ACTION_FETCH_PRODUCTS_FAIL = 'fetch/products/fail'
export const ACTION_FETCH_PRODUCTS_LOADING = 'fetch/products/loading'
export const ACTION_UPDATE_PRODUCT_IN_LIST = 'update/product_in_list'
export const ACTION_DELETE_PRODUCT_IN_LIST = 'delete/product_in_list'

// edit category
export const ACTION_EDIT_CATEGORY_FETCHED = 'update/category/fetched'
export const ACTION_EDIT_CATEGORY_FETCHING = 'update/category/fetching'
export const ACTION_EDIT_CATEGORY_FETCH_FAIL = 'update/category/fetch_fail'
export const ACTION_EDIT_CATEGORY_SENDING = 'update/category/sending'
export const ACTION_EDIT_CATEGORY_FAIL = 'update/category/fail'
export const ACTION_EDIT_CATEGORY_SUCCESS = 'update/category/success'
export const ACTION_EDIT_CATEGORY_RESET = 'update/category/reset'

export const ACTION_DELETE_CATEGORY_SUCCESS = 'delete/category/success'
export const ACTION_DELETE_CATEGORY_IN_LIST = 'delete/category/in_list'
export const ACTION_DELETE_CATEGORY_FAIL = 'delete/category/fail'

// edit category
export const ACTION_EDIT_LIST_FETCHED = 'update/list/fetched'
export const ACTION_EDIT_LIST_FETCHING = 'update/list/fetching'
export const ACTION_EDIT_LIST_FETCH_FAIL = 'update/list/fetch_fail'
export const ACTION_EDIT_LIST_SENDING = 'update/list/sending'
export const ACTION_EDIT_LIST_FAIL = 'update/list/fail'
export const ACTION_EDIT_LIST_SUCCESS = 'update/list/success'
export const ACTION_EDIT_LIST_RESET = 'update/list/reset'

export const ACTION_DELETE_LIST_FAIL = 'delete/list/fail'
export const ACTION_DELETE_LIST_SUCCESS = 'delete/list/success'
export const ACTION_DELETE_LIST_IN_LIST = 'delete/list/in_list'

// user
export const ACTION_USER_UNAUTHORIZED = 'user/unauthorized'
export const ACTION_USER_LOADED = 'user/loaded'
export const ACTION_USER_FETCH_FAILED = 'user/fetch/failed'

// login
export const ACTION_USER_LOGIN_FAIL = 'user/login/fail'
export const ACTION_USER_LOGIN_SENDING = 'user/login/sending'
export const ACTION_USER_LOGIN_EMAIL_SENT = 'user/login/email_sent'
export const ACTION_USER_LOGIN_RESET_ERROR = 'user/login/reset/error'

// register
export const ACTION_USER_REGISTER_FAIL = 'user/register/fail'
export const ACTION_USER_REGISTER_SENDING = 'user/register/sending'
export const ACTION_USER_REGISTER_EMAIL_SENT = 'user/register/email_sent'
export const ACTION_USER_REGISTER_RESET_ERROR = 'user/register/reset/error'

// shopping list
export const ACTION_FETCH_SHOPPING_LISTS_FAIL = 'shopping_lists/fetch/fail'
export const ACTION_FETCH_SHOPPING_LISTS_SUCCESS = 'shopping_lists/fetch/success'
export const ACTION_FETCH_SHOPPING_LISTS_LOADING = 'shopping_lists/fetch/loading'

// shopping list
export const ACTION_FETCH_SHOPPING_LIST_FAIL = 'shopping_list/fetch/fail'
export const ACTION_FETCH_SHOPPING_LIST_SUCCESS = 'shopping_list/fetch/success'
export const ACTION_FETCH_SHOPPING_LIST_LOADING = 'shopping_list/fetch/loading'

export const ACTION_SHOPPING_LIST_ADD_ITEM = 'shopping_list/add_item'
export const ACTION_SHOPPING_LIST_UPDATE_ITEM = 'shopping_list/update_item'
export const ACTION_SHOPPING_LIST_DELETE_ITEM = 'shopping_list/delete_item'
export const ACTION_SHOPPING_LIST_UPDATE_ITEM_SENDING = 'shopping_list/update_item/sending'
export const ACTION_SHOPPING_LIST_UPDATE_ITEM_SUCCESS = 'shopping_list/update_item/success'
export const ACTION_SHOPPING_LIST_UPDATE_ITEM_FAIL = 'shopping_list/update_item/fail'

// shopping form
export const ACTION_CREATE_SHOPPING_LIST_ITEM_FAIL = 'shopping_list_form/create/fail'
export const ACTION_CREATE_SHOPPING_LIST_ITEM_SUCCESS = 'shopping_list_form/create/success'
export const ACTION_CREATE_SHOPPING_LIST_ITEM_SENDING = 'shopping_list_form/create/sending'

// edit form
export const ACTION_SHOPPING_LIST_ITEM_EDIT_RESET = 'shopping_list_item/edit/reset'
export const ACTION_SHOPPING_LIST_ITEM_EDIT_FAIL = 'shopping_list_item/edit/fail'
export const ACTION_SHOPPING_LIST_ITEM_EDIT_SUCCESS = 'shopping_list_item/edit/success'
export const ACTION_SHOPPING_LIST_ITEM_EDIT_SENDING = 'shopping_list_item/edit/sending'

// shopping list delete
export const ACTION_SHOPPING_LIST_ITEM_DELETE_FAIL = 'shopping_list_item/delete/fail'
export const ACTION_SHOPPING_LIST_ITEM_DELETE_SUCCESS = 'shopping_list_item/delete/success'
export const ACTION_SHOPPING_LIST_ITEM_DELETE_SENDING = 'shopping_list_item/delete/sending'

// version
export const ACTION_VERSION_CORE_LOADED = 'version/core/loaded'

