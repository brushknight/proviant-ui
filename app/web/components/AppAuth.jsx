import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../common/redux/selectors'
import { isSaaS } from '../../common/utils/env'
import { Route, useHistory, useLocation } from 'react-router-dom'
import { Spinner } from '@blueprintjs/core'
import { STATUS_LOADED } from '../../common/redux/reducers/consts'
import { useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import FinishAuth from './user/FinishAuth'
import Login from './user/Login'
import PropTypes from 'prop-types'
import Register from './user/Register'

const AppAuth = ({ user }) => {
	const history = useHistory()
	const location = useLocation()

	useEffect(() => {
		const uri = location.pathname
		if (isSaaS() && user.status === STATUS_LOADED) {
			if (uri === '/login' || uri === '/register' || uri === '/finish-auth') {
				history.push('/')
			}
		}
	}, [user.status])

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

const mapStateToProps = (state, ownProps) => {
	const user = getUser(state)
	return { user }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

AppAuth.propTypes = {
	user: PropTypes.object
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(AppAuth)
