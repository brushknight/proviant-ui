import ReactGA from 'react-ga'

export const init = () => {
	console.log('ga: init')
	ReactGA.initialize('UA-204945660-1', {
		debug: true
	})
}

export const pageView = (pageName) => {
	console.log('ga: page: ' + pageName)
	ReactGA.pageview(pageName)
}

export const GA_WEB_PAGE_LOGIN = '/login'
export const GA_WEB_PAGE_REGISTER = '/register'
export const GA_WEB_PAGE_FINISH_AUTH = '/finish-auth'
export const GA_WEB_PAGE_CATEGORY_CREATE = '/category-create'
export const GA_WEB_PAGE_CATEGORY_EDIT = '/category-edit'
export const GA_WEB_PAGE_LIST_CREATE = '/list-create'
export const GA_WEB_PAGE_LIST_EDIT = '/list-edit'
export const GA_WEB_PAGE_PRODUCTS = '/products'
export const GA_WEB_PAGE_PRODUCT = '/product'
export const GA_WEB_PAGE_PRODUCT_CREATE = '/product-create'
export const GA_WEB_PAGE_PRODUCT_EDIT = '/product-edit'
export const GA_WEB_PAGE_SHOPPING_LIST = '/shopping-list'

export const GA_IOS_PAGE_AUTH = '/ios/auth'
export const GA_IOS_PAGE_FINISH_AUTH = '/ios/finish-auth'
export const GA_IOS_PAGE_SHOPPING_LIST = '/ios/shopping-list'
export const GA_IOS_PAGE_SHOPPING_LIST_ADD = '/ios/shopping-list/add'
export const GA_IOS_PAGE_SHOPPING_LIST_UPDATE = '/ios/shopping-list/update'
export const GA_IOS_PAGE_FEEDBACK = '/ios/feedback'
export const GA_IOS_PAGE_PROFILE = '/ios/profile'
