import * as React from 'react'
import { actionLogin } from '../../redux/actions/user'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../redux/selectors'
import { InputGroup, Overlay } from '@blueprintjs/core'
import { STATUS_UNAUTHORIZED } from '../../redux/reducers/consts'
import { useState } from 'react'
import { withTranslation } from 'react-i18next'
import Button from '../generic/Button'
import PropTypes from 'prop-types'

const Login = ({ user, login }) => {
	const [email, setEmail] = useState('')

	return (
		<Overlay
			isOpen={user.status === STATUS_UNAUTHORIZED}
			onClose={() => {
			}}
		>
			<section className={'auth-form'}>
				<form className={'auth-form__inner'} onSubmit={(e) => {
					e.preventDefault()
					login(email)
				}}>
					<InputGroup
						value={email}
						onChange={(event) => {
							setEmail(event.target.value)
						}}
					/>
					<Button type={'submit'} className={'button--login'} text={'Login'}/>
				</form>
			</section>
		</Overlay>
	)
}

const mapStateToProps = (state, ownProps) => {
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	const user = getUser(state)
	return { t, user }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		login: (email) => dispatch(actionLogin(email, locale))
	}
}

Login.propTypes = {
	user: PropTypes.object,
	login: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(Login)
