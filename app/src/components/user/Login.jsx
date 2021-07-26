import * as React from 'react'
import { actionLogin } from '../../redux/actions/user'
import { Callout, InputGroup, Intent, Overlay } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../redux/selectors'
import { STATUS_DEFAULT, STATUS_EDITING, STATUS_ERROR, STATUS_SENDING, STATUS_SUCCESS } from '../../redux/reducers/consts'
import { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import Button from '../generic/Button'
import PropTypes from 'prop-types'

const Login = ({ t, user, login }) => {
	const [email, setEmail] = useState('')
	const [status, setStatus] = useState(user.status)

	useEffect(() => {
		setStatus(user.status)
	}, [user.status])

	if (status === STATUS_SUCCESS) {
		return (
			<Overlay
				isOpen={status === STATUS_SUCCESS}
				onClose={() => {
				}}
			>
				<section className={'auth-form'}>
					<Callout title={t('login.check_your_email')}/>
				</section>
			</Overlay>
		)
	}

	let error

	if (status === STATUS_ERROR) {
		error = (
			<Callout intent={Intent.DANGER}>{t(user.error)}</Callout>
		)
	}

	return (
		<Overlay
			isOpen={status !== STATUS_DEFAULT}
			onClose={() => {
			}}
		>
			<section className={'auth-form'}>
				<form className={'auth-form__inner'} onSubmit={(e) => {
					e.preventDefault()
					login(email)
				}}>
					{error}
					<InputGroup
						value={email}
						onChange={(event) => {
							setEmail(event.target.value)
							setStatus(STATUS_EDITING)
						}}
					/>
					<Button disabled={status === STATUS_SENDING || status === STATUS_ERROR} type={'submit'}
						className={'button--login'} text={'Login'}/>
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
	login: PropTypes.func,
	t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(Login)
