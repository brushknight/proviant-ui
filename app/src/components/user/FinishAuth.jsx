import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Overlay } from '@blueprintjs/core'
import { withTranslation } from 'react-i18next'
import Button from '../generic/Button'
import PropTypes from 'prop-types'

const FinishAuth = ({ t }) => {
	return (
		<Overlay
			isOpen={true}
			onClose={() => {
			}}
		>
			<section className={'auth-form'}>
				<div className={'auth-form__wrapper'}>
					<h1 className={'auth-form__title'}>{t('finish_auth.title')}</h1>
					<p>{t('finish_auth.text')}</p>
					<Button
						text={t('finish_auth.button')}
						className={'button--login'}
						onClick={() => {
							window.location.href = 'https://mail.google.com/mail/u/0/#inbox'
						}}
					/>
				</div>
			</section>
		</Overlay>
	)
}

const mapStateToProps = (state, ownProps) => {
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	return { t }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

FinishAuth.propTypes = {
	t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(FinishAuth)
