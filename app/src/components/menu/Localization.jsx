import * as React from 'react'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const Localization = (props) => {
	return (
		<ButtonGroup minimal={true} fill={true}>
			<Button
				icon={props.i18n.language === 'en' ? 'tick' : ''}
				intent={props.i18n.language === 'en' ? Intent.SUCCESS : Intent.NONE}
				onClick={() => {
					props.i18n.changeLanguage('en')
				}}>🇺🇸 En</Button>
			<Button
				icon={props.i18n.language === 'ru' ? 'tick' : ''}
				intent={props.i18n.language === 'ru' ? Intent.SUCCESS : Intent.NONE}
				onClick={() => {
					props.i18n.changeLanguage('ru')
				}}>🇷🇺 Ру</Button>
		</ButtonGroup>
	)
}

Localization.propTypes = {
	i18n: PropTypes.object
}

export default withTranslation('translations')(Localization)
