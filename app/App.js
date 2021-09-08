import { Provider } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import ShoppingList from './native/containers/shopping/ShoppingList'
import store from './common/redux/store'

export default function App () {
	return (
		<Provider store={store}>
			<View style={styles.container}>
				<ShoppingList/>
				<StatusBar style="auto"/>
			</View>
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		backgroundColor: '#fff'
	}
})
