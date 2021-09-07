const JsBarcode = require('jsbarcode')

export const textToBase64Barcode = (barcode) => {
	const canvas = document.createElement('canvas')
	try {
		JsBarcode(canvas, barcode, {
			format: 'EAN13',
			height: 30
		})
	} catch (e) {
		console.error('invalid EAN13')
		return null
	}
	return canvas.toDataURL('image/png')
}
