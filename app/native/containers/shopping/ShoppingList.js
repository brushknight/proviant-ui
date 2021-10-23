import { connect } from 'react-redux'
import { getShoppingList, getShoppingLists, getUser } from '../../../common/redux/selectors'
import {
	KeyboardAvoidingView,
	Modal,
	Platform,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { shoppingFormReset } from '../../../common/redux/actions/shopping/form'
import { shoppingListFetchItems } from '../../../common/redux/actions/shopping/list'
import { shoppingListFetchLists } from '../../../common/redux/actions/shopping/lists'
import { shoppingListItemCheck, shoppingListItemUncheck } from '../../../common/redux/actions/shopping/tick'
import { STATUS_DEFAULT, STATUS_FETCH_FAILED, STATUS_LOADING } from '../../../common/redux/reducers/consts'
import AddButton from '../../components/generic/AddButton'
import Deeplink from '../utils/Deeplink'
import Feedback from '../user/Feedback'
import MoreButton from '../../components/generic/MoreButton'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ShoppingItemCreate from './ShoppingItemCreate'
import ShoppingItemUpdate from './ShoppingItemUpdate'
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
		fetchLists,
		actionShoppingFormReset
	}
) => {
	const [createModal, setCreateModal] = useState(false)
	const [updateModal, setUpdateModal] = useState(false)
	const [feedbackModalStatus, setFeedbackModalStatus] = useState(false)
	const [openItemId, setOpenItemId] = useState(null)

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

	const actionHandlers = {
		shopping_item_create: () => {
			setCreateModal(true)
			actionShoppingFormReset()
		},
		feedback: () => {
			setFeedbackModalStatus(true)
		}
	}

	const feedbackModal = (
		<Modal
			animationType="slide"
			transparent={true}
			visible={feedbackModalStatus}
			onRequestClose={() => {
			}}
			onShow={() => {
			}}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ height: '100%' }}
			>
				<LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.modal}>
					<TouchableOpacity
						style={styles.modal}
						// onPress={Keyboard.dismiss}
						onPress={() => {
							setFeedbackModalStatus(false)
						}}
						activeOpacity={1}
					>
						<Feedback
							style={styles.modal_inner}
							onClose={() => {
								setFeedbackModalStatus(false)
							}}
						/>
					</TouchableOpacity>
				</LinearGradient>
			</KeyboardAvoidingView>
		</Modal>
	)

	const createItemModal = (
		<Modal
			animationType="slide"
			transparent={true}
			visible={createModal}
			onRequestClose={() => {
			}}
			onShow={() => {
			}}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ height: '100%' }}
			>
				<LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.modal}>
					<TouchableOpacity
						style={styles.modal}
						// onPress={Keyboard.dismiss}
						onPress={() => {
							setCreateModal(false)
						}}
						activeOpacity={1}
					>
						<ShoppingItemCreate
							style={styles.modal_inner}
							shoppingListId={shoppingListId}
							onClose={() => {
								setCreateModal(false)
							}}
						/>
					</TouchableOpacity>
				</LinearGradient>
			</KeyboardAvoidingView>
		</Modal>
	)

	const updateItemModal = (
		<Modal
			animationType="slide"
			transparent={true}
			visible={updateModal}
			onRequestClose={() => {
			}}
			onShow={() => {
			}}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ height: '100%' }}
			>
				<LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.modal}>
					<TouchableOpacity
						style={styles.modal}
						// onPress={Keyboard.dismiss}
						onPress={() => {
							setUpdateModal(false)
						}}
						activeOpacity={1}
					>
						<ShoppingItemUpdate
							itemId={openItemId}
							style={styles.modal_inner}
							shoppingListId={shoppingListId}
							onClose={() => {
								setUpdateModal(false)
							}}
						/>
					</TouchableOpacity>
				</LinearGradient>
			</KeyboardAvoidingView>
		</Modal>
	)

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

	let itemsJsx = []

	if (items.length === 0) {
		itemsJsx = (
			<Text style={styles.hint_no_items}>
				No items, pull to refresh
			</Text>
		)
	} else {
		itemsJsx = items.map(item => (
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
				onClick={() => {
					setOpenItemId(item.id)
					setUpdateModal(true)
				}}
			/>
		))
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle={'dark-content'}/>
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
				{itemsJsx}
			</ScrollView>
			<AddButton navigation={navigation} shoppingListId={shoppingListId} actionHandlers={actionHandlers}/>
			<MoreButton navigation={navigation} shoppingListId={shoppingListId} actionHandlers={actionHandlers}/>

			{createItemModal}
			{updateItemModal}
			{feedbackModal}
		</SafeAreaView>

	)
}

const styles = {
	modal: {
		width: '100%',
		height: '100%'
	},
	modal_inner: {
		marginTop: 'auto',
		backgroundColor: '#ffffff',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingBottom: 10
	},
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
		uncheckItem: (listId, id) => dispatch(shoppingListItemUncheck(listId, id, locale)),
		actionShoppingFormReset: () => dispatch(shoppingFormReset())
	}
}

ShoppingList.propTypes = {
	model: PropTypes.object,
	fetchItems: PropTypes.func,
	actionShoppingFormReset: PropTypes.func,
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
