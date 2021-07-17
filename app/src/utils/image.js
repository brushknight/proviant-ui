import 'regenerator-runtime/runtime.js'

export const fileToBase64 = async (file) => {
	const result = await toBase64(file).catch(e => Error(e))
	if (result instanceof Error) {
		console.log('Error: ', result.message)
	}
	return result
}

const toBase64 = file => new Promise((resolve, reject) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = () => resolve(reader.result)
	reader.onerror = error => reject(error)
})
