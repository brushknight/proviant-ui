import { connect } from 'react-redux'
import { getShoppingList, getUser } from '../../../common/redux/selectors'
import { isSaaS } from '../../../common/utils/env'
import { ScrollView, Text, View } from 'react-native'
import { shoppingListFetchItems } from '../../../common/redux/actions/shopping/list'
import { shoppingListItemCheck, shoppingListItemUncheck } from '../../../common/redux/actions/shopping/tick'
import { STATUS_FETCH_FAILED, STATUS_LOADING, STATUS_UNAUTHORIZED } from '../../../common/redux/reducers/consts'
import AddButton from '../../components/generic/AddButton'
import Deeplink from '../utils/Deeplink'
import Login from '../user/Login'
import PropTypes from 'prop-types'
import React from 'react'
import ShoppingListRow from '../../components/shopping/ShoppingListRow'

const ShoppingList = ({ fetchItems, status, error, items, checkItem, uncheckItem, navigation, userStatus }) => {
	const shoppingListId = 3

	React.useEffect(() => {
		fetchItems(shoppingListId)
	}, [userStatus])

	if (isSaaS() && userStatus === STATUS_UNAUTHORIZED) {
		return (

			<Login/>

		)
	}

	if (status === STATUS_LOADING) {
		return (
			<View>
				<Deeplink/>
				<Text>
					Loading
				</Text>
			</View>

		)
	}

	if (status === STATUS_FETCH_FAILED) {
		return (
			<View>
				<Deeplink/>
				<Text>
					{error}
				</Text>
			</View>
		)
	}

	if (items.length === 0) {
		return (
			<View>
				<Deeplink/>
				<Text>
					no items
				</Text>
			</View>
		)
	}

	return (
		<View style={style.container}>
			<Deeplink/>
			<ScrollView style={style.list}>
				{items.map(item => (
					<ShoppingListRow
						navigation={navigation}
						key={item.id}
						item={item}
						onCheck={() => {
							checkItem(shoppingListId, item.id)
						}}
						onUncheck={() => {
							uncheckItem(shoppingListId, item.id)
						}}
					/>
				))}

			</ScrollView>
			<AddButton navigation={navigation}/>
		</View>

	)
}

const style = {
	container: {
		minHeight: '100%',
		flex: 1
	},
	list: {
		paddingBottom: 100
	}
}

const mapStateToProps = (state, ownProps) => {
	const shoppingList = getShoppingList(state)

	const user = getUser(state)

	return {
		model: shoppingList.model,
		items: shoppingList.model.items,
		status: shoppingList.status,
		error: shoppingList.error,
		userStatus: user.status
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		fetchItems: (id) => dispatch(shoppingListFetchItems(id, locale)),
		checkItem: (listId, id) => dispatch(shoppingListItemCheck(listId, id, locale)),
		uncheckItem: (listId, id) => dispatch(shoppingListItemUncheck(listId, id, locale))
	}
}

ShoppingList.propTypes = {
	model: PropTypes.object,
	fetchItems: PropTypes.func,
	checkItem: PropTypes.func,
	uncheckItem: PropTypes.func,
	t: PropTypes.func,
	status: PropTypes.string,
	error: PropTypes.string,
	items: PropTypes.array,
	navigation: PropTypes.object,
	userStatus: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)
