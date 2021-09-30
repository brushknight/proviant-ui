import * as React from 'react'
import { Intent, Tag } from '@blueprintjs/core'
import { unixToDate } from '../../../common/utils/date'
import { withTranslation } from 'react-i18next'
import DeleteButton from '../generic/DeleteButton'
import PropTypes from 'prop-types'

const StockListRow = ({ item, onDelete, i18n }) => {
	let expire = (
		<span className='product-stock__row-expires'><Tag
			intent={Intent.NONE}>{i18n.t('stock.no_expiration_date')}</Tag></span>
	)

	if (item.expire > 0) {
		const expiresFormatted = unixToDate(new Date(item.expire * 1000))
		expire = (
			<span className='product-stock__row-expires'>{i18n.t('stock.expires')}: <b
				className='product-stock__row-value'>{expiresFormatted}</b></span>
		)
	}

	return (
		<div className='product-stock__row'>
			<span className='product-stock__row-quantity'>{i18n.t('stock.quantity')}: <b
				className='product-stock__row-value'>{item.quantity}</b></span>
			{expire}

			<DeleteButton
				text={i18n.t('stock.button_delete')}
				confirmationText={i18n.t('stock.button_delete_confirmation')}
				onDelete={onDelete}
			/>
		</div>
	)
}

StockListRow.propTypes = {
	item: PropTypes.object,
	onDelete: PropTypes.func,
	i18n: PropTypes.object
}

export default withTranslation('translations')(StockListRow)
