import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import ShoppingList from "./native/containers/shopping/ShoppingList";
import store from './native/redux/store'
import {Provider} from 'react-redux'

export default function App() {
	return (
		<Provider store={store}>
			<View style={styles.container}>
				<ShoppingList/>
				<StatusBar style="auto"/>
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
