import { getCookie, setCookie } from './cookies'
import { getEnv, isWeb } from './env'

import AsyncStorage from '@react-native-async-storage/async-storage'

const TokenStorageKey = getEnv() + '_Token'
const TokenCookieKey = 'Token'

export const getJWT = async () => {
	if (isWeb()) {
		return getCookie(TokenCookieKey)
	} else {
		try {
			const value = await AsyncStorage.getItem(TokenStorageKey)
			if (value !== null) {
				return value
			}
		} catch (e) {
			console.error(e)
		}
	}
}

export const clearJWT = async () => {
	try {
		if (isWeb()) {
			setCookie(TokenCookieKey, '')
		}
		await AsyncStorage.removeItem(TokenStorageKey)
		return true
	} catch (e) {
		console.error('failed to clear token')
		return false
	}
}

export const saveJWT = async (token) => {
	try {
		await AsyncStorage.setItem(TokenStorageKey, token)
	} catch (e) {
		console.error('failed to save token')
	}
}
