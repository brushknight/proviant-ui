import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {shoppingListFetchItems} from "../../redux/actions/shopping/list";
import {shoppingListItemCheck, shoppingListItemUncheck} from "../../redux/actions/shopping/tick";
import {getShoppingList} from "../../redux/selectors";
import PropTypes from 'prop-types'
import {STATUS_FETCH_FAILED, STATUS_LOADING} from "../../redux/reducers/consts";
import ShoppingListRow from "../../components/shopping/ShoppingListRow";

const ShoppingList = ({fetchItems, status, model, items}) => {

	React.useEffect(() => {
		fetchItems(1)
	}, [])

	if (status === STATUS_LOADING) {
		return (
			<Text>
				Loading
			</Text>
		)
	}

	if (status === STATUS_FETCH_FAILED) {
		return (
			<Text>
				{error}
			</Text>
		)
	}

	if (items.length === 0) {
		return (
			<Text>
				no items
			</Text>
		)
	}

	return (
		<View>
			{items.map(item => (
				<ShoppingListRow item={item}/>
			))}
		</View>
	)
};

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});


const mapStateToProps = (state, ownProps) => {
	const shoppingList = getShoppingList(state)

	return {
		model: shoppingList.model,
		items: shoppingList.model.items,
		status: shoppingList.status,
		error: shoppingList.error
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		fetchItems: (query) => dispatch(shoppingListFetchItems(query, locale)),
		checkItem: (listId, id) => dispatch(shoppingListItemCheck(listId, id, locale)),
		uncheckItem: (listId, id) => dispatch(shoppingListItemUncheck(listId, id, locale))
	}
}

ShoppingList.propTypes = {
	model: PropTypes.object,
	fetchItems: PropTypes.func,
	checkItem: PropTypes.func,
	uncheckItem: PropTypes.func,
	t: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)
