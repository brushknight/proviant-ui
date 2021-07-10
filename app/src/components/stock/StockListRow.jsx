import * as React from 'react'
import { Button, Intent } from '@blueprintjs/core'
import { unixToDate } from '../../utils/date'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const StockListRow = (props) => {
	const expires = unixToDate(new Date(props.item.expire * 1000))

	return (
		<div className='product-stock__row'>
			<span className='product-stock__row-quantity'>{props.i18n.t('stock.quantity')}: <b className='product-stock__row-value'>{props.item.quantity}</b></span>
			<span className='product-stock__row-expires'>{props.i18n.t('stock.expires')}: <b className='product-stock__row-value'>{expires}</b></span>
			<Button onClick={props.onDelete} icon={'delete'} minimal={true} intent={Intent.DANGER} text={props.i18n.t('stock.button_delete')}/>
		</div>
	)
}

StockListRow.propTypes = {
	item: PropTypes.object,
	onDelete: PropTypes.func,
	i18n: PropTypes.object
}

export default withTranslation('translations')(StockListRow)
