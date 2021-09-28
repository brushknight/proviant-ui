import * as React from 'react'
import { unixToDateTime } from '../../../common/utils/date'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const ConsumptionLogRow = ({ item, i18n }) => {
	let consumptionDateTime = []

	const expiresFormatted = unixToDateTime(new Date(item.consumed_at * 1000))
	consumptionDateTime = (
		<span className='product-stock__row-expires'>{i18n.t('consumption_log.date')}: <b
			className='product-stock__row-value'>{expiresFormatted}</b></span>
	)

	return (
		<div className='product-stock__row'>
			<span className='product-stock__row-quantity'>{i18n.t('consumption_log.quantity')}: <b
				className='product-stock__row-value'>{item.quantity}</b></span>
			{consumptionDateTime}
		</div>
	)
}

ConsumptionLogRow.propTypes = {
	item: PropTypes.object,
	i18n: PropTypes.object
}

export default withTranslation('translations')(ConsumptionLogRow)
