import { connect, Provider } from 'react-redux'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { getUser } from '../../common/redux/selectors'
import { logoutUser } from '../../common/redux/actions/user/user'
import { NavigationContainer } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Profile from './user/Profile'
import React, {useEffect} from 'react'
import ShoppingList from './shopping/ShoppingList'
import store from '../../common/redux/store'
import {loadShoppingListSorting} from "../../common/redux/actions/user/userSettings";
import {PropsType} from "react-native/ReactCommon/hermes/inspector/tools/msggen/src/Type";

const Drawer = createDrawerNavigator()

const MainRouter = ({ loadSettings }) => {

	useEffect(() => {
		loadSettings()
	}, [])

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Drawer.Navigator>
					<Drawer.Screen

						name="shopping_list"
						leftButtonIconStyle={{ tintColor: 'white' }}
						component={ShoppingList}
						options={{
							title: 'Список Покупок',
							// eslint-disable-next-line react/prop-types
							drawerIcon: ({ focused, size }) => (
								<Icon name={'shopping-cart'} size={size} color={focused ? 'purple' : 'grey'}/>
							)
						}}
					/>
					{/*<Drawer.Screen*/}

					{/*	name="shops"*/}
					{/*	leftButtonIconStyle={{ tintColor: 'white' }}*/}
					{/*	component={ShoppingList}*/}
					{/*	options={{*/}
					{/*		title: 'Shops',*/}
					{/*		// eslint-disable-next-line react/prop-types*/}
					{/*		drawerIcon: ({ focused, size }) => (*/}
					{/*			<Icon name={'shopping-basket'} size={size} color={focused ? 'purple' : 'grey'}/>*/}
					{/*		)*/}
					{/*	}}*/}
					{/*/>*/}
					<Drawer.Screen
						name="profile"
						component={Profile}
						options={{
							title: 'Профиль',
							// eslint-disable-next-line react/prop-types
							drawerIcon: ({ focused, size }) => (
								<Icon name={'cog'} size={size} color={focused ? 'purple' : 'grey'}/>
							)
						}}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
		</Provider>
	)
}

MainRouter.propTypes = {
	loadSettings: PropsType.func
}

const AppCore = ({ loadSettings }) => {

	return (
		<MainRouter loadSettings={loadSettings}/>
	)
}

const mapStateToProps = (state, ownProps) => {
	const user = getUser(state)

	return {
		userStatus: user.status
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		logout: () => dispatch(logoutUser()),
		loadSettings: () => {
			dispatch(loadShoppingListSorting())
		}
	}
}

AppCore.propTypes = {
	loadSettings: PropsType.func
}

export default connect(mapStateToProps, mapDispatchToProps)(AppCore)
