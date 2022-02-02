import { connect, Provider } from 'react-redux'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { getUser } from '../../common/redux/selectors'
import { logoutUser } from '../../common/redux/actions/user/user'
import { NavigationContainer } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Profile from './user/Profile'
import React from 'react'
import ShoppingList from './shopping/ShoppingList'
import store from '../../common/redux/store'

const Drawer = createDrawerNavigator()

const MainRouter = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Drawer.Navigator>
					<Drawer.Screen

						name="shopping_list"
						leftButtonIconStyle={{ tintColor: 'white' }}
						component={ShoppingList}
						options={{
							title: 'Shopping List',
							// eslint-disable-next-line react/prop-types
							drawerIcon: ({ focused, size }) => (
								<Icon name={'shopping-cart'} size={size} color={focused ? 'purple' : 'grey'}/>
							)
						}}
					/>
					<Drawer.Screen

						name="shops"
						leftButtonIconStyle={{ tintColor: 'white' }}
						component={ShoppingList}
						options={{
							title: 'Shops',
							// eslint-disable-next-line react/prop-types
							drawerIcon: ({ focused, size }) => (
								<Icon name={'shopping-basket'} size={size} color={focused ? 'purple' : 'grey'}/>
							)
						}}
					/>
					<Drawer.Screen
						name="profile"
						component={Profile}
						options={{
							title: 'Profile',
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

const AppCore = () => {
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

AppCore.propTypes = {}

export default connect(mapStateToProps, mapDispatchToProps)(AppCore)
