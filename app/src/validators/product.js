export const validateProduct = (product) => {
	if (!product.list) {
		return 'product_validator.error_empty_list'
	}

	return null
}
