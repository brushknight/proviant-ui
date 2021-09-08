import {backendUrl, isSaaS} from './env'

export const generateAuthApiUrl = (uri) => {
	return backendUrl() + '/api/v1/auth' + uri
}

export const generateCoreApiUrl = (uri) => {
	if (isSaaS()) {
		return backendUrl() + '/api/v1/core' + uri
	}

	return backendUrl() + '/api/v1' + uri
}
