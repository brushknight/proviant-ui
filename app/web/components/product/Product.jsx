import * as React from 'react'
import { GA_PAGE_PRODUCT, pageView } from '../../../common/utils/ga'
import { useParams } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import ConsumptionLog from '../consumption_log/ConsumptionLog'
import ProductDetails from './ProductDetails'
import ProductStock from '../stock/ProductStock'
import PropTypes from 'prop-types'

const Product = (props) => {
	const { id, productId } = useParams()

	pageView(GA_PAGE_PRODUCT)

	return (
		<div className={props.className}>
			<ProductDetails
				closePopover={props.closePopover}
				productId={productId}
				listOrCategoryId={id}
				filterType={props.filterType}
			/>
			<ProductStock
				productId={productId}
			/>
			<ConsumptionLog
				productId={productId}
			/>
		</div>
	)
}

Product.propTypes = {
	closePopover: PropTypes.func,
	filterType: PropTypes.string,
	i18n: PropTypes.object,
	className: PropTypes.string
}

export default withTranslation('translations')(Product)
