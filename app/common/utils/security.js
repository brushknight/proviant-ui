import { getCookie } from './cookies'
import { isWeb } from './env'

import AsyncStorage from '@react-native-async-storage/async-storage'

export const getJWT = async () => {
	if (isWeb()) {
		return getCookie('Token')
	} else {
		try {
			const value = await AsyncStorage.getItem('Token')
			if (value !== null) {
				return value
				// value previously stored
			}
		} catch (e) {
			// error reading value
		}
	}
}

export const saveJWT = async (token) => {
	try {
		await AsyncStorage.setItem('Token', token)
	} catch (e) { // saving error  }
	}
}
