import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchUser, updateLocale } from '../../redux/actions/user'
import { getUser } from '../../redux/selectors'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const LanguagePicker = ({ className, i18n, updateLocale }) => {
	return (
		<div className={'language-picker ' + className}>
			<ul className={'language-picker__list'}>
				<li className={'language-picker__item'}>
					<input
						className={'language-picker__input'}
						type={'radio'}
						name={'language'}
						value={'ru'}
						id={'language-picker-ru'}
						checked={i18n.language === 'ru'}
						onChange={(e) => {
							i18n.changeLanguage('ru')
							updateLocale('ru')
						}}
					/>
					<label
						className={'language-picker__label language-picker__label--ru'}
						htmlFor={'language-picker-ru'}>рус</label>
				</li>
				<li className={'language-picker__item'}>
					<input
						className={'language-picker__input'}
						type={'radio'}
						name={'language'}
						value={'en'}
						id={'language-picker-en'}
						checked={i18n.language === 'en'}
						onChange={(e) => {
							i18n.changeLanguage('en')
							updateLocale('en')
						}}
					/>
					<label
						className={'language-picker__label language-picker__label--en'}
						htmlFor={'language-picker-en'}>eng</label>
				</li>
			</ul>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	const i18n = ownProps.i18n
	const user = getUser(state)
	return { t, i18n, user }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language

	return {
		fetchUser: () => dispatch(fetchUser(locale)),
		updateLocale: (l) => dispatch(updateLocale(l))
	}
}

LanguagePicker.propTypes = {
	className: PropTypes.string,
	t: PropTypes.func,
	i18n: PropTypes.object,
	user: PropTypes.object,
	fetchUser: PropTypes.func,
	updateLocale: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(LanguagePicker)
