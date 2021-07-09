import * as React from 'react'
import { addStock, consumeStock, deleteStock, fetchStock } from '../../redux/actions/stock'
import { Callout, Intent, Spinner } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getStock } from '../../redux/selectors'
import { STATUS_ERROR, STATUS_LOADING, STATUS_NOT_FOUND } from '../../redux/reducers/consts'
import { useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import AddForm from './AddForm'
import ConsumeForm from './ConsumeForm'
import PropTypes from 'prop-types'
import StockListRow from './StockListRow'

const ProductStock = ({ productId, stock, t, fetchStock, addStock, consumeStock, deleteStock }) => {
	useEffect(() => {
		fetchStock(productId)
	}, [productId])

	if (stock.status === STATUS_LOADING) {
		return (
			<div className='product-stock'>
				<Spinner/>
			</div>
		)
	}

	if (stock.status === STATUS_ERROR) {
		return (
			<div className='product-stock'>
				<Callout
					intent={Intent.DANGER}
					title={t('stock.error_fetch')}>{stock.error}</Callout>
			</div>
		)
	}

	if (stock.status === STATUS_NOT_FOUND) {
		return <div className='product-stock'></div>
	}

	let stockList

	if (stock.items.length === 0) {
		stockList = <Callout title={t('stock.not_found')}/>
	} else {
		stockList = stock.items.map(item => <StockListRow onDelete={() => {
			deleteStock(productId, item.id)
		}} item={item}/>)
	}

	return (
		<div className='product-stock'>
			<div className='product-stock__form'>
				<ConsumeForm
					status={stock.consumeForm.status}
					error={stock.consumeForm.error}
					onSubmit={quantity => {
						consumeStock(productId, quantity)
					}}
				/>
				<AddForm
					status={stock.addForm.status}
					error={stock.addForm.error}
					onSubmit={(quantity, date) => {
						addStock(productId, quantity, date)
					}}
				/>
			</div>
			<div className='product-stock__list'>
				<h3>{t('stock.title_in_stock')}</h3>
				{stockList}
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const stock = getStock(state)
	const productId = ownProps.productId

	const t = ownProps.i18n.t.bind(ownProps.i18n)
	return { productId, stock, t }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		fetchStock: (productId) => dispatch(fetchStock(productId, locale)),
		addStock: (productId, quantity, date) => dispatch(addStock(productId, quantity, date, locale)),
		consumeStock: (productId, quantity) => dispatch(consumeStock(productId, quantity, locale)),
		deleteStock: (productId, id) => dispatch(deleteStock(productId, id, locale))
	}
}

ProductStock.propTypes = {
	fetchStock: PropTypes.func,
	stockAddFormFieldChanged: PropTypes.func,
	addStock: PropTypes.func,
	consumeStock: PropTypes.func,
	deleteStock: PropTypes.func,
	stock: PropTypes.object,
	productId: PropTypes.string,
	t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ProductStock)
