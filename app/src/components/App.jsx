import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, BrowserRouter as Switch } from 'react-router-dom'

import AppAuth from './AppAuth'
import AppCore from './AppCore'
import store from '../redux/store'
import User from './user/User'
import {init} from "../utils/ga";

const App = () => {

	init()

	return (
		<Router>
			<Provider store={store}>
				<User/>
				<React.StrictMode>
					<Switch>
						<AppAuth/>
						<AppCore/>
					</Switch>
				</React.StrictMode>
			</Provider>
		</Router>
	)
}

export default App
