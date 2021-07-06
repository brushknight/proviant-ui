import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST, FILTER_TYPE_NONE } from '../const'

export const generateEditProductLink = (filterType, listOrCategoryId, productId) => {
	switch (filterType) {
	case FILTER_TYPE_CATEGORY:
		return '/category/' + listOrCategoryId + '/product-edit/' + productId
	case FILTER_TYPE_LIST:
		return '/list/' + listOrCategoryId + '/product-edit/' + productId
	case FILTER_TYPE_NONE:
		return '/product-edit/' + productId
	default:
		console.error('unexpected filter type')
	}
}

export const generateProductLink = (filterType, listOrCategoryId, productId) => {
	switch (filterType) {
	case FILTER_TYPE_CATEGORY:
		return '/category/' + listOrCategoryId + '/product/' + productId
	case FILTER_TYPE_LIST:
		return '/list/' + listOrCategoryId + '/product/' + productId
	case FILTER_TYPE_NONE:
		return '/product/' + productId
	default:
		console.error('unexpected filter type')
	}
}
