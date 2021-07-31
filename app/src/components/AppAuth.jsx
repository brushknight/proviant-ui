import * as React from 'react'
import { isSaaS } from '../utils/run_mode'
import { Route } from 'react-router-dom'
import FinishAuth from './user/FinishAuth'
import Login from './user/Login'
import Register from './user/Register'

const AppAuth = () => {
	if (!isSaaS()) {
		return (
			<div/>
		)
	}

	return (
		<div>
			<Route path='/login'>
				<Login/>
			</Route>

			<Route path='/register'>
				<Register/>
			</Route>

			<Route path='/finish-auth'>
				<FinishAuth/>
			</Route>
		</div>
	)
}

export default AppAuth
