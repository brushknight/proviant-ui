import * as React from 'react'
import { Button, Callout, FormGroup, Icon, Intent, NumericInput, Spinner, SpinnerSize, Tag } from '@blueprintjs/core'
import { STATUS_ERROR, STATUS_LOADING, STATUS_SUCCESS } from '../../../common/redux/reducers/consts'
import { useState } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const ConsumeForm = ({ error, status, onSubmit, i18n }) => {
	const [quantity, setQuantity] = useState(1)

	let consumeStockFormError

	if (status === STATUS_ERROR) {
		consumeStockFormError = <Callout icon={null} intent={Intent.DANGER}>{error}</Callout>
	}

	let consumeStockFormLoading

	if (status === STATUS_LOADING) {
		consumeStockFormLoading = <Spinner size={SpinnerSize.SMALL}/>
	}

	let consumeStockFormSuccess

	if (status === STATUS_SUCCESS) {
		consumeStockFormSuccess = <Tag intent={Intent.SUCCESS} large={true} minimal={true}><Icon icon={'tick'}/></Tag>
	}

	const actionOnSubmit = (e) => {
		e.preventDefault()
		onSubmit(quantity)
	}

	return (
		<form className='product-stock__consume' onSubmit={actionOnSubmit}>
			<h3>{i18n.t('stock.title_consume')}</h3>
			{consumeStockFormError}
			<FormGroup label={i18n.t('stock.quantity')} inline={true}>
				<NumericInput
					min={1}
					value={quantity}
					onValueChange={value => setQuantity(value)}
				/>
			</FormGroup>
			<Button icon={'flame'} type={'submit'}>
				{i18n.t('stock.button_consume')} <b>{quantity}</b>
			</Button>
			{consumeStockFormLoading}
			{consumeStockFormSuccess}
		</form>
	)
}

ConsumeForm.propTypes = {
	status: PropTypes.string,
	error: PropTypes.string,
	onSubmit: PropTypes.func,
	i18n: PropTypes.object
}

export default withTranslation('translations')(ConsumeForm)
