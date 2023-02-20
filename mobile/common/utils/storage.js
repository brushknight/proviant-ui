import { getCookie, setCookie } from './cookies'
import { isWeb } from './env'

import AsyncStorage from '@react-native-async-storage/async-storage'

export const getVariable = async (varName) => {
	if (isWeb()) {
		return getCookie(varName)
	} else {
		try {
			const value = await AsyncStorage.getItem(varName)
			if (value !== null) {
				return value
			}
		} catch (e) {
			console.error(e)
		}
	}
}

export const clearVariable = async (varName) => {
	try {
		if (isWeb()) {
			setCookie(varName, '')
		}
		await AsyncStorage.removeItem(varName)
		return true
	} catch (e) {
		console.error('failed to clear ' + varName)
		return false
	}
}

export const saveVariable = async (varName, value) => {
	try {
		await AsyncStorage.setItem(varName, value)
	} catch (e) {
		console.error('failed to save ' + varName)
	}
}
