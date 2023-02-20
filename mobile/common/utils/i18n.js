export const generateLocaleHeader = (locale) => {
	return {
		headers: {
			'User-Locale': locale
		}
	}
}
