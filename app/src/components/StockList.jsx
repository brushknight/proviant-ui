import * as React from 'react'
import { addStock, consumeStock, deleteStock, fetchStock, stockAddFormFieldChanged } from '../redux/actions/stock'
import { Callout, Intent, Spinner } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { getStock } from '../redux/selectors'
import { STATUS_ERROR, STATUS_LOADING, STATUS_NOT_FOUND } from '../redux/reducers/consts'
import { useEffect } from 'react'
import AddForm from './stock/AddForm'
import ConsumeForm from './stock/ConsumeForm'
import PropTypes from 'prop-types'
import StockListRow from './StockListRow'

const StockList = ({ productId, stock, fetchStock, addStock, consumeStock, deleteStock }) => {
	useEffect(() => {
		fetchStock(productId)
	}, [productId])

	if (stock.status === STATUS_LOADING) {
		return (
			<section>
				<Spinner/>
			</section>
		)
	}

	if (stock.status === STATUS_ERROR) {
		return (
			<section>
				<Callout
					intent={Intent.DANGER}
					title={'Something went wrong with stock fetching'}>{stock.error}</Callout>
			</section>
		)
	}

	if (stock.status === STATUS_NOT_FOUND) {
		return <section></section>
	}

	let stockList

	if (stock.items.length === 0) {
		stockList = <Callout title={'No stock found for this product'}/>
	} else {
		stockList = stock.items.map(item => <StockListRow onDelete={() => {
			deleteStock(productId, item.id)
		}} item={item}/>)
	}

	return (
		<section>
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
			<h3>In stock</h3>
			{stockList}
		</section>
	)
}

const mapStateToProps = (state, ownProps) => {
	const stock = getStock(state)
	const productId = ownProps.productId

	return { productId, stock }
}

const mapDispatchToProps = dispatch => {
	return {
		fetchStock: (productId) => dispatch(fetchStock(productId)),
		addStock: (productId, quantity, date) => dispatch(addStock(productId, quantity, date)),
		consumeStock: (productId, quantity) => dispatch(consumeStock(productId, quantity)),
		deleteStock: (productId, id) => dispatch(deleteStock(productId, id))
	}
}

StockList.propTypes = {
	fetchStock: PropTypes.func,
	stockAddFormFieldChanged: PropTypes.func,
	addStock: PropTypes.func,
	consumeStock: PropTypes.func,
	deleteStock: PropTypes.func,
	stock: PropTypes.object,
	productId: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList)
