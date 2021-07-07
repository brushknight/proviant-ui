import * as React from 'react'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'
import { useCookies } from 'react-cookie'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const Localization = (props) => {
	const [cookies, setCookie, removeCookie] = useCookies([])

	return (
		<ButtonGroup minimal={true} fill={true}>
			<Button
				icon={props.i18n.language === 'en' ? 'tick' : ''}
				intent={props.i18n.language === 'en' ? Intent.SUCCESS : Intent.NONE}
				onClick={() => {
					props.i18n.changeLanguage('en')
					setCookie('i18next', 'en', {
						path: '/'
					})
				}}>🇺🇸 En</Button>
			<Button
				icon={props.i18n.language === 'ru' ? 'tick' : ''}
				intent={props.i18n.language === 'ru' ? Intent.SUCCESS : Intent.NONE}
				onClick={() => {
					const oneYearFromNow = new Date()
					oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
					props.i18n.changeLanguage('ru')
					setCookie('i18next', 'ru', {
						path: '/',
						expires: oneYearFromNow
					})
				}}>🇷🇺 Ру</Button>
		</ButtonGroup>
	)
}

Localization.propTypes = {
	i18n: PropTypes.object
}

export default withTranslation('translations')(Localization)
