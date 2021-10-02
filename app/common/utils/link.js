import { FILTER_TYPE_CATEGORY, FILTER_TYPE_LIST, FILTER_TYPE_NONE } from '../../web/const'
import { getJWT } from './security'
import { isSaaS, isWeb } from './env'

const CATEGORY_REGEX = /\/category\/(\d*)/
const LIST_REGEX = /\/list\/(\d*)/
export const ROUTE_ROOT = 'root'
export const ROUTE_CATEGORY = 'category'
export const ROUTE_LIST = 'list'

export const parseLocationFromUri = (path) => {
	if (CATEGORY_REGEX.test(path)) {
		const result = path.match(CATEGORY_REGEX)

		if (result.length > 1) {
			return {
				route: ROUTE_CATEGORY,
				id: Number(result[1])
			}
		}
	}

	if (LIST_REGEX.test(path)) {
		const result = path.match(LIST_REGEX)

		if (result.length > 1) {
			return {
				route: ROUTE_LIST,
				id: Number(result[1])
			}
		}
	}

	return {
		route: ROUTE_ROOT
	}
}

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

export const generateNewProductLink = (filterType, listOrCategoryId) => {
	switch (filterType) {
	case FILTER_TYPE_CATEGORY:
		return '/category/' + listOrCategoryId + '/product-new'
	case FILTER_TYPE_LIST:
		return '/list/' + listOrCategoryId + '/product-new'
	case FILTER_TYPE_NONE:
		return '/product-new'
	default:
		console.error('unexpected filter type')
	}
}

export const generateListLink = (listId) => {
	return '/list/' + listId
}

export const generateCategoryLink = (listId) => {
	return '/category/' + listId
}

export const backendUrl = () => {
	if (isWeb()) {
		return ''
	}

	return 'http://10.0.0.117:8090'
}

export const generateAuthApiUrl = (uri) => {
	return backendUrl() + '/api/v1/auth' + uri
}

export const generateCoreApiUrl = (uri) => {
	if (isSaaS()) {
		return backendUrl() + '/api/v1/core' + uri
	}

	return backendUrl() + '/api/v1' + uri
}

export const generateHeaders = async (locale) => {
	return {
		headers: {
			'User-Locale': locale,
			Token: await getJWT()
		}
	}
}

export const getAllUrlParams = (url) => {
	// get query string from url (optional) or window
	let queryString = url ? url.split('?')[1] : window.location.search.slice(1)

	// we'll store the parameters here
	const obj = {}

	// if query string exists
	if (queryString) {
		// stuff after # is not part of query string, so get rid of it
		queryString = queryString.split('#')[0]

		// split our query string into its component parts
		const arr = queryString.split('&')

		for (let i = 0; i < arr.length; i++) {
			// separate the keys and the values
			const a = arr[i].split('=')

			// set parameter name and value (use 'true' if empty)
			let paramName = a[0]
			let paramValue = typeof (a[1]) === 'undefined' ? true : a[1]

			// (optional) keep case consistent
			paramName = paramName.toLowerCase()
			if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase()

			// if the paramName ends with square brackets, e.g. colors[] or colors[2]
			if (paramName.match(/\[(\d+)?\]$/)) {
				// create key if it doesn't exist
				const key = paramName.replace(/\[(\d+)?\]/, '')
				if (!obj[key]) obj[key] = []

				// if it's an indexed array e.g. colors[2]
				if (paramName.match(/\[\d+\]$/)) {
					// get the index value and add the entry at the appropriate position
					const index = /\[(\d+)\]/.exec(paramName)[1]
					obj[key][index] = paramValue
				} else {
					// otherwise add the value to the end of the array
					obj[key].push(paramValue)
				}
			} else {
				// we're dealing with a string
				if (!obj[paramName]) {
					// if it doesn't exist, create property
					obj[paramName] = paramValue
				} else if (obj[paramName] && typeof obj[paramName] === 'string') {
					// if property does exist and it's a string, convert it to an array
					obj[paramName] = [obj[paramName]]
					obj[paramName].push(paramValue)
				} else {
					// otherwise add the property
					obj[paramName].push(paramValue)
				}
			}
		}
	}

	return obj
}
