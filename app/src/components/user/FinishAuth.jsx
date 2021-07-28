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
			<section className={'finish-auth'}>
				<div className={'finish-auth__wrapper'}>
					<h1 className={'finish-auth__title'}>{t('finish_auth.title')}</h1>
					<p>{t('finish_auth.text')}</p>
					<Button
						text={t('finish_auth.button')}
						className={'button--login'}
						onClick={() => {
							window.location.href = 'https://mail.google.com/mail/u/0/#inbox'
						}}
					/>
				</div>
				<div className={'finish-auth__language-picker language-picker'}>
					<ul className={'language-picker__list'}>
						<li className={'language-picker__item'}>
							<input className={'language-picker__input'} type={'radio'} name={'language'} value={'ru'} id={'language-picker-ru'}/>
							<label className={'language-picker__label language-picker__label--ru'} htmlFor={'language-picker-ru'}>рус</label>
						</li>
						<li className={'language-picker__item'}>
							<input className={'language-picker__input'} type={'radio'} name={'language'} value={'en'} id={'language-picker-en'}/>
							<label className={'language-picker__label language-picker__label--en'} htmlFor={'language-picker-en'}>eng</label>
						</li>
					</ul>
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
