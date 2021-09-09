import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { StyleSheet } from 'react-native'
import React from 'react'
import ShoppingList from './native/containers/shopping/ShoppingList'
import store from './common/redux/store'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ShoppingDetails from './native/containers/shopping/ShoppingDetails'

const Stack = createNativeStackNavigator()

export default function App () {
	return (
		<Provider store={store}>
			<NavigationContainer>

				<Stack.Navigator>

					<Stack.Screen
						name="shopping_list"
						component={ShoppingList}
						options={{ title: 'Shopping List' }}
					/>
					<Stack.Screen
						name="shopping_details"
						component={ShoppingDetails}
						options={{ title: 'Shopping Details' }}
					/>

				</Stack.Navigator>

			</NavigationContainer>
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		backgroundColor: '#fff'
	}
})
