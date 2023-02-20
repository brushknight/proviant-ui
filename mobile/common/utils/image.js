import 'regenerator-runtime/runtime.js'

export const fileToBase64 = async (file) => {
	const result = await toBase64(file).catch(e => Error(e))
	if (result instanceof Error) {
		console.error('Error: ', result.message)
	}
	return result
}

const toBase64 = file => new Promise((resolve, reject) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = () => resolve(reader.result)
	reader.onerror = error => reject(error)
})

export const isImageValid = (file) => {
	if (file.size > 1024 * 1024 * 10) {
		return false
	}

	return true
}
