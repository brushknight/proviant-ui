import * as React from 'react'
import { actionRegister, registerResetError } from '../../../common/redux/actions/register'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { GA_PAGE_REGISTER, pageView } from '../../../common/utils/ga'
import { getRegister } from '../../../common/redux/selectors'
import { Overlay } from '@blueprintjs/core'
import { STATUS_EDITING, STATUS_ERROR, STATUS_SENDING, STATUS_SUCCESS } from '../../../common/redux/reducers/consts'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import Button from '../generic/Button'
import LanguagePicker from '../generic/LanguagePicker'
import PropTypes from 'prop-types'
import Version from '../generic/Version'

const Register = ({ t, form, register, resetError }) => {
	const history = useHistory()

	const [email, setEmail] = useState('')
	const [status, setStatus] = useState(form.status)

	useEffect(() => {
		setStatus(form.status)
	}, [form.status])

	if (status === STATUS_SUCCESS) {
		history.push('/finish-auth')
	}

	let error

	if (status === STATUS_ERROR) {
		error = (
			<span className={'auth-form__error'}>{t(form.error)}</span>
		)
	}

	pageView(GA_PAGE_REGISTER)

	const onSubmit = (e) => {
		e.preventDefault()
		register(email)
	}

	return (
		<Overlay
			isOpen={true}
		>
			<section className={'auth-form'}>
				<div className={'auth-form__wrapper'}>
					<h1 className={'auth-form__title'}>{t('register.title')}</h1>
					<form className={'auth-form__inner'} onSubmit={onSubmit}>
						<input
							className={'auth-form__email ' + (status === STATUS_ERROR ? 'auth-form__email--error' : '')}
							type={'email'}
							required
							form="novalidatedform"
							placeholder={t('register.email_placeholder')}
							onFocus={() => {
								setStatus(STATUS_EDITING)
								resetError()
							}}
							onChange={(e) => {
								setEmail(e.target.value)
								setStatus(STATUS_EDITING)
								resetError()
							}}/>
						{error}

						<Button
							disabled={status === STATUS_SENDING || status === STATUS_ERROR}
							type={'submit'}
							className={'auth-form__button button--login'}
							text={t('register.button')}
						/>
						<a
							className={'auth-form__link'}
							onClick={() => {
								history.push('/login')
							}}
						>{t('register.have_account')}</a>
					</form>
				</div>
				<LanguagePicker className={'finish-auth__language-picker'}/>
				<Version className={'auth-form__version'}/>
			</section>
		</Overlay>
	)
}

const mapStateToProps = (state, ownProps) => {
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	const form = getRegister(state)
	return { t, form }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		register: (email) => dispatch(actionRegister(email, locale)),
		resetError: () => dispatch(registerResetError())
	}
}

Register.propTypes = {
	form: PropTypes.object,
	register: PropTypes.func,
	resetError: PropTypes.func,
	t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(Register)
