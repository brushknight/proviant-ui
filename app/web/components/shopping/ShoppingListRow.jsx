import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const ShoppingListRow = ({ item, listId, onCheck, onUncheck, i18n }) => {
	const history = useHistory()

	let tickClassModification = ''
	let rowClassModification = ''
	if (item.checked) {
		tickClassModification = 'shopping-list-item__tick--checked'
		rowClassModification = 'shopping-list-item--checked'
	}

	const onTick = (e) => {
		e.stopPropagation()
		if (item.checked) {
			onUncheck()
		} else {
			onCheck()
		}
	}

	return (
		<div className={'shopping-list-item ' + rowClassModification} onClick={() => {
			history.push('/shopping/' + listId + '/item/' + item.id)
		}}>
			<div className={'shopping-list-item__title'}>{item.title}</div>
			<div className={'shopping-list-item__price'}>{item.price}</div>
			<div className={'shopping-list-item__quantity'}>{item.quantity}</div>
			<div
				className={'shopping-list-item__tick ' + tickClassModification}
				onClick={onTick}
			/>
		</div>
	)
}

ShoppingListRow.propTypes = {
	item: PropTypes.object,
	i18n: PropTypes.object,
	listId: PropTypes.number,
	onCheck: PropTypes.func,
	onUncheck: PropTypes.func
}

export default withTranslation('translations')(ShoppingListRow)
