import { getCookie } from './cookies'
import { isWeb } from './env'

import AsyncStorage from '@react-native-async-storage/async-storage'

const TokenStorageKey = 'Token'

export const getJWT = async () => {
	if (isWeb()) {
		return getCookie(TokenStorageKey)
	} else {
		try {
			const value = await AsyncStorage.getItem(TokenStorageKey)
			if (value !== null) {
				return value
			}
		} catch (e) {
			console.log(e)
		}
	}
}

export const saveJWT = async (token) => {
	try {
		await AsyncStorage.setItem(TokenStorageKey, token)
	} catch (e) {
		console.log('failed to save token')
	}
}
