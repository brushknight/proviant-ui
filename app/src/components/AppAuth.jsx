import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../redux/selectors'
import { isSaaS } from '../utils/env'
import { Route, useHistory } from 'react-router-dom'
import { Spinner } from '@blueprintjs/core'
import { STATUS_LOADED } from '../redux/reducers/consts'
import { useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import FinishAuth from './user/FinishAuth'
import Login from './user/Login'
import PropTypes from 'prop-types'
import Register from './user/Register'

const AppAuth = ({ user }) => {
	const history = useHistory()

	useEffect(() => {
		if (isSaaS() && user.status === STATUS_LOADED) {
			history.push('/')
			return (
				<Spinner/>
			)
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
