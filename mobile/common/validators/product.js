export const validateProduct = (product) => {
	if (!product.list_id) {
		return 'product_validator.error_empty_list'
	}

	return null
}
