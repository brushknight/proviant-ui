import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, BrowserRouter as Switch, Route } from 'react-router-dom'

import { init } from '../../common/utils/ga'
import AppAuth from './AppAuth'
import AppCore from './AppCore'
import Sandbox from './Sandbox'
import store from '../../common/redux/store'
import User from './user/User'

const App = () => {
	init()

	return (
		<Router>
			<Provider store={store}>
				<User/>
				<React.StrictMode>
					<Switch>
						<Route path='/sandbox'>
							<Sandbox/>
						</Route>
						<AppAuth/>
						<AppCore/>
					</Switch>
				</React.StrictMode>
			</Provider>
		</Router>
	)
}

export default App
