import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getShoppingLists } from '../../../common/redux/selectors'
import { shoppingListsFetch } from '../../../common/redux/actions/shopping/lists'
import { STATUS_DEFAULT, STATUS_LOADED } from '../../../common/redux/reducers/consts'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const ShoppingListRedirect = ({ status, error, items, t, fetchItems }) => {
	const history = useHistory()

	useEffect(() => {
		if (status === STATUS_DEFAULT) {
			fetchItems()
		}

		if (status === STATUS_LOADED) {
			if (items.length > 0) {
				history.push('/shopping/' + items[0].id)
			}
		}
	}, [status])

	return (
		<div/>
	)
}

const mapStateToProps = (state, ownProps) => {
	const shoppingLists = getShoppingLists(state)

	const t = ownProps.i18n.t.bind(ownProps.i18n)
	return {
		items: shoppingLists.items,
		status: shoppingLists.status,
		error: shoppingLists.error,
		t
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		fetchItems: () => dispatch(shoppingListsFetch(locale))
	}
}

ShoppingListRedirect.propTypes = {
	status: PropTypes.string,
	error: PropTypes.string,
	fetchItems: PropTypes.func,
	t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ShoppingListRedirect)
