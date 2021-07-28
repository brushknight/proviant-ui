import * as React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const LanguagePicker = ({ className, i18n }) => {
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

LanguagePicker.propTypes = {
	className: PropTypes.string,
	i18n: PropTypes.object
}

export default withTranslation('translations')(LanguagePicker)
