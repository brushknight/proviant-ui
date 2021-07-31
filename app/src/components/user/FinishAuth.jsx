import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Overlay } from '@blueprintjs/core'
import { withTranslation } from 'react-i18next'
import Button from '../generic/Button'
import LanguagePicker from '../generic/LanguagePicker'
import PropTypes from 'prop-types'

const FinishAuth = ({ t }) => {
	return (
		<Overlay
			isOpen={true}
			onClose={() => {
			}}
		>
			<section className={'finish-auth'}>
				<div className={'finish-auth__wrapper'}>
					<h1 className={'finish-auth__title'}>{t('finish_auth.title')}</h1>
					<p>{t('finish_auth.text')}</p>
					<Button
						link={'https://mail.google.com/mail/u/0/#inbox'}
						text={t('finish_auth.button')}
						className={'button--login'}
						icon={'envelope'}
					/>
				</div>
				<LanguagePicker className={'finish-auth__language-picker'}/>
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
