import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { StyleSheet } from 'react-native'
import React from 'react'
import ShoppingList from './native/containers/shopping/ShoppingList'
import store from './common/redux/store'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ShoppingItemCreate from './native/containers/shopping/ShoppingItemCreate'
import ShoppingItemUpdate from './native/containers/shopping/ShoppingItemUpdate'

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
						name="shopping_item_update"
						component={ShoppingItemUpdate}
						options={{ title: 'Shopping Details' }}
					/>
					<Stack.Screen
						name="shopping_item_create"
						component={ShoppingItemCreate}
						options={{ title: 'Shopping Create' }}
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
