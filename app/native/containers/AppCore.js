import { connect, Provider } from 'react-redux'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { getUser } from '../../common/redux/selectors'
import { isSaaS } from '../../common/utils/env'
import { logoutUser } from '../../common/redux/actions/user'
import { NavigationContainer } from '@react-navigation/native'
import { STATUS_LOADED } from '../../common/redux/reducers/consts'
import Deeplink from './utils/Deeplink'
import Login from './user/Login'
import Profile from './user/Profile'
import PropTypes from 'prop-types'
import React from 'react'
import ShoppingItemCreate from './shopping/ShoppingItemCreate'
import ShoppingItemUpdate from './shopping/ShoppingItemUpdate'
import ShoppingList from './shopping/ShoppingList'
import store from '../../common/redux/store'

const Drawer = createDrawerNavigator()

const RootStack = createStackNavigator()

const DrawerRouter = () => {
	return (
		<Drawer.Navigator>
			<Drawer.Screen
				name="shopping_list"
				component={ShoppingList}
				options={{ title: 'Shopping List' }}
			/>
			<Drawer.Screen
				name="profile"
				component={Profile}
				options={{ title: 'Profile' }}
			/>

		</Drawer.Navigator>
	)
}

const MainRouter = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<RootStack.Navigator>
					<RootStack.Screen
						name="Back"
						component={DrawerRouter}
						options={{ headerShown: false }}
					/>
					<RootStack.Group screenOptions={{ presentation: 'modal' }}>
						<RootStack.Screen name="shopping_item_create" component={ShoppingItemCreate}/>
						<RootStack.Screen name="shopping_item_update" component={ShoppingItemUpdate}/>
					</RootStack.Group>
				</RootStack.Navigator>

			</NavigationContainer>
		</Provider>
	)
}

const AppCore = ({ logout, userStatus }) => {
	return (
		<MainRouter/>
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
		logout: () => dispatch(logoutUser())
	}
}

AppCore.propTypes = {
	logout: PropTypes.func,
	navigation: PropTypes.object,
	userStatus: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(AppCore)
