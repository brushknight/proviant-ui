import { connect } from 'react-redux'
import { getShoppingList, getShoppingLists, getUser } from '../../../common/redux/selectors'
import { isSaaS } from '../../../common/utils/env'
import { RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native'
import { shoppingListFetchItems } from '../../../common/redux/actions/shopping/list'
import { shoppingListFetchLists } from '../../../common/redux/actions/shopping/lists'
import { shoppingListItemCheck, shoppingListItemUncheck } from '../../../common/redux/actions/shopping/tick'
import {
	STATUS_DEFAULT,
	STATUS_FETCH_FAILED,
	STATUS_LOADING,
	STATUS_UNAUTHORIZED
} from '../../../common/redux/reducers/consts'
import AddButton from '../../components/generic/AddButton'
import Deeplink from '../utils/Deeplink'
import Login from '../user/Login'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import ShoppingListRow from '../../components/shopping/ShoppingListRow'

const ShoppingList = (
	{
		fetchItems,
		status,
		error,
		items,
		checkItem,
		uncheckItem,
		navigation,
		userStatus,
		shoppingListId,
		fetchListsStatus,
		fetchLists
	}
) => {
	useEffect(() => {
		if (!shoppingListId && fetchListsStatus === STATUS_DEFAULT) {
			fetchLists()
		}

		if (status === STATUS_DEFAULT && shoppingListId && items.length === 0) {
			fetchItems(shoppingListId)
		}
	}, [userStatus, status, fetchListsStatus, shoppingListId])

	const onRefresh = () => {
		if (!shoppingListId) {
			fetchLists()
		} else {
			fetchItems(shoppingListId)
		}
	}

	if (isSaaS() && userStatus === STATUS_UNAUTHORIZED) {
		return (
			<Login/>
		)
	}

	// if (status === STATUS_LOADING || fetchListsStatus === STATUS_LOADING) {
	// 	return (
	// 		<View>
	// 			<Deeplink/>
	// 			<Text style={styles.hint_no_items}>
	// 				Loading
	// 			</Text>
	// 		</View>
	//
	// 	)
	// }

	if (status === STATUS_FETCH_FAILED || fetchListsStatus === STATUS_FETCH_FAILED) {
		return (
			<View>
				<Deeplink/>
				<ScrollView
					contentContainerStyle={styles.empty_scroll_view}
					refreshControl={
						<RefreshControl
							refreshing={fetchListsStatus === STATUS_LOADING}
							onRefresh={onRefresh}
						/>
					}
				>
					<Text style={styles.hint_error}>
						{error}
					</Text>
				</ScrollView>
			</View>
		)
	}

	if (items.length === 0) {
		return (
			<View>
				<Deeplink/>
				<ScrollView
					contentContainerStyle={styles.empty_scroll_view}
					refreshControl={
						<RefreshControl
							refreshing={fetchListsStatus === STATUS_LOADING}
							onRefresh={onRefresh}
						/>
					}
				>
					<Text style={styles.hint_no_items}>
						No items, pull to refresh
					</Text>
				</ScrollView>
				<AddButton navigation={navigation} shoppingListId={shoppingListId} />
			</View>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle={'dark-content'} />
			<Deeplink/>
			<ScrollView
				contentContainerStyle={styles.list}
				refreshControl={
					<RefreshControl
						refreshing={fetchListsStatus === STATUS_LOADING}
						onRefresh={onRefresh}
					/>
				}
			>
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
			<AddButton navigation={navigation} shoppingListId={shoppingListId} />
		</SafeAreaView>

	)
}

const styles = {
	container: {
		// minHeight: '100%',
		flex: 1,
		justifyContent: 'flex-end'
	},
	list: {
		paddingBottom: 100
	},
	empty_scroll_view: {
		minHeight: '100%'
	},
	hint_no_items: {
		marginTop: 50,
		fontSize: 16,
		textAlign: 'center'
	},
	hint_error: {
		marginTop: 50,
		fontSize: 16,
		textAlign: 'center'
	}
}

const mapStateToProps = (state, ownProps) => {
	const shoppingList = getShoppingList(state)
	const shoppingLists = getShoppingLists(state)

	const user = getUser(state)

	return {
		shoppingListId: shoppingLists.items && shoppingLists.items.length > 0 ? shoppingLists.items[0].id : null,
		fetchListsStatus: shoppingLists.status,
		model: shoppingList.model,
		items: shoppingList.model.items,
		status: shoppingList.status,
		error: shoppingLists.error || shoppingList.error,
		userStatus: user.status
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		fetchLists: () => dispatch(shoppingListFetchLists(locale)),
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
	userStatus: PropTypes.string,
	shoppingListId: PropTypes.number,
	fetchListsStatus: PropTypes.string,
	fetchLists: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)
