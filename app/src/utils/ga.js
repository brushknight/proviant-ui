import ReactGA from 'react-ga';

export const init = () => {
    ReactGA.initialize('UA-204945660-1');
}

export const pageView = (pageName) => {
    ReactGA.pageview(pageName);
}

export const GA_PAGE_LOGIN = '/login'
export const GA_PAGE_REGISTER = '/register'
export const GA_PAGE_FINISH_AUTH = '/finish-auth'
export const GA_PAGE_CATEGORY_CREATE = '/category-create'
export const GA_PAGE_CATEGORY_EDIT = '/category-edit'
export const GA_PAGE_LIST_CREATE = '/list-create'
export const GA_PAGE_LIST_EDIT = '/list-edit'
export const GA_PAGE_PRODUCTS = '/products'
export const GA_PAGE_PRODUCT = '/product'
export const GA_PAGE_PRODUCT_CREATE = '/product-create'
export const GA_PAGE_PRODUCT_EDIT = '/product-edit'
export const GA_PAGE_SHOPPING_LIST = '/shopping-list'
