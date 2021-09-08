import * as React from 'react'
import { Button, Callout, FormGroup, Icon, Intent, NumericInput, Spinner, SpinnerSize, Tag } from '@blueprintjs/core'
import { DateInput } from '@blueprintjs/datetime'
import { STATUS_ERROR, STATUS_LOADING, STATUS_SUCCESS } from '../../../common/redux/reducers/consts'
import { unixToDate } from '../../../common/utils/date'
import { useState } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const AddForm = (props) => {
	const [quantity, setQuantity] = useState(1)
	const [date, setDate] = useState(new Date())

	let formError

	if (props.status === STATUS_ERROR) {
		formError = <Callout icon={null} intent={Intent.DANGER}>{props.error}</Callout>
	}

	let formLoading

	if (props.status === STATUS_LOADING) {
		formLoading = <Spinner size={SpinnerSize.SMALL}/>
	}

	let formSuccess

	if (props.status === STATUS_SUCCESS) {
		formSuccess = <Tag intent={Intent.SUCCESS} large={true} minimal={true}><Icon icon={'tick'}/></Tag>
	}

	const jsDateFormatter = {
		// note that the native implementation of Date functions differs between browsers
		formatDate: date => unixToDate(date),
		placeholder: 'DD/MM/YYYY',
		value: date,
		maxDate: new Date('2100/01/01'),
		onChange: (date) => {
			setDate(date)
		}
	}

	return (
		<div className='product-stock__add'>
			<h3>{props.i18n.t('stock.title_add')}</h3>
			{formError}
			<FormGroup label={props.i18n.t('stock.quantity')} inline={true}>
				<NumericInput
					min={1}
					value={quantity}
					onValueChange={value => setQuantity(value)}
				/>
			</FormGroup>
			<FormGroup label={props.i18n.t('stock.expires')} inline={true}>
				<DateInput {...jsDateFormatter} />
			</FormGroup>
			<Button icon={'cube-add'} onClick={() => {
				props.onSubmit(quantity, date)
			}}>{props.i18n.t('stock.button_add')} <b>{quantity}</b></Button> {formLoading} {formSuccess}
		</div>
	)
}

AddForm.propTypes = {
	status: PropTypes.string,
	error: PropTypes.string,
	onSubmit: PropTypes.func,
	i18n: PropTypes.object
}

export default withTranslation('translations')(AddForm)
