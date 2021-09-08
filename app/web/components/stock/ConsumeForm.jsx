import * as React from 'react'
import { Button, Callout, FormGroup, Icon, Intent, NumericInput, Spinner, SpinnerSize, Tag } from '@blueprintjs/core'
import { STATUS_ERROR, STATUS_LOADING, STATUS_SUCCESS } from '../../../common/redux/reducers/consts'
import { useState } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const ConsumeForm = (props) => {
	const [quantity, setQuantity] = useState(1)

	let consumeStockFormError

	if (props.status === STATUS_ERROR) {
		consumeStockFormError = <Callout icon={null} intent={Intent.DANGER}>{props.error}</Callout>
	}

	let consumeStockFormLoading

	if (props.status === STATUS_LOADING) {
		consumeStockFormLoading = <Spinner size={SpinnerSize.SMALL}/>
	}

	let consumeStockFormSuccess

	if (props.status === STATUS_SUCCESS) {
		consumeStockFormSuccess = <Tag intent={Intent.SUCCESS} large={true} minimal={true}><Icon icon={'tick'}/></Tag>
	}

	return (
		<div className='product-stock__consume'>
			<h3>{props.i18n.t('stock.title_consume')}</h3>
			{consumeStockFormError}
			<FormGroup label={props.i18n.t('stock.quantity')} inline={true}>
				<NumericInput
					min={1}
					value={quantity}
					onValueChange={value => setQuantity(value)}
				/>
			</FormGroup>
			<Button icon={'flame'} onClick={() => {
				props.onSubmit(quantity)
			}}>{props.i18n.t('stock.button_consume')} <b>{quantity}</b></Button> {consumeStockFormLoading} {consumeStockFormSuccess}
		</div>
	)
}

ConsumeForm.propTypes = {
	status: PropTypes.string,
	error: PropTypes.string,
	onSubmit: PropTypes.func,
	i18n: PropTypes.object
}

export default withTranslation('translations')(ConsumeForm)
