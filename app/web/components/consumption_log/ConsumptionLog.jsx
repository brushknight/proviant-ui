import * as React from 'react'
import { Callout, Intent, Spinner } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchConsumptionLog } from '../../../common/redux/actions/consumption/log'
import { getConsumptionLog } from '../../../common/redux/selectors'
import { STATUS_ERROR, STATUS_LOADING, STATUS_NOT_FOUND } from '../../../common/redux/reducers/consts'
import { useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import ConsumptionLogRow from './ConsumptionLogRow'
import PropTypes from 'prop-types'

const ConsumptionLog = ({ productId, consumptionLog, t, fetch }) => {
	useEffect(() => {
		fetch(productId)
	}, [productId])

	if (consumptionLog.status === STATUS_LOADING) {
		return (
			<div className='product-stock'>
				<Spinner/>
			</div>
		)
	}

	if (consumptionLog.status === STATUS_ERROR) {
		return (
			<div className='product-stock'>
				<Callout
					intent={Intent.DANGER}
					title={t('consumption_log.error_fetch')}>{consumptionLog.error}</Callout>
			</div>
		)
	}

	if (consumptionLog.status === STATUS_NOT_FOUND) {
		return <div className='product-stock'/>
	}

	let list

	if (consumptionLog.items.length === 0) {
		list = <Callout title={t('consumption_log.not_found')}/>
	} else {
		list = consumptionLog.items.map(item => (
			<ConsumptionLogRow
				key={'consumption_log-' + item.id}
				item={item}
			/>
		)
		)
	}

	return (
		<div className='product-stock'>
			<div className='product-stock__list'>
				<h3 className='product-stock__title'>{t('consumption_log.title')}</h3>
				{list}
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const consumptionLog = getConsumptionLog(state)
	const productId = ownProps.productId

	const t = ownProps.i18n.t.bind(ownProps.i18n)
	return { productId, consumptionLog, t }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		fetch: (productId) => dispatch(fetchConsumptionLog(productId, locale))

	}
}

ConsumptionLog.propTypes = {
	fetch: PropTypes.func,
	consumptionLog: PropTypes.object,
	productId: PropTypes.string,
	t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ConsumptionLog)
