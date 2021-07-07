import * as React from 'react'
import { Button, Intent } from '@blueprintjs/core'
import { unixToDate } from '../utils/date'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const StockListRow = (props) => {
	const expires = unixToDate(new Date(props.item.expire * 1000))

	return (
		<div>
			Quantity: {props.item.quantity} Expires: {expires}
			<Button onClick={props.onDelete} icon={'delete'} minimal={true} intent={Intent.DANGER} text={'Delete entry'}/>
		</div>
	)
}

StockListRow.propTypes = {
	item: PropTypes.object,
	onDelete: PropTypes.func
}

export default withTranslation('translations')(StockListRow)
