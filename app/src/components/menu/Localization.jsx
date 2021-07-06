import * as React from 'react'
import { Button, ButtonGroup } from '@blueprintjs/core'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const Localization = (props) => {
	return (
		<ButtonGroup minimal={true} fill={true}>
			<Button onClick={() => {
				props.i18n.changeLanguage('en')
			}}>🇺🇸 English</Button>
			<Button onClick={() => {
				props.i18n.changeLanguage('ru')
			}}>🇷🇺 Русский</Button>
		</ButtonGroup>
	)
}

Localization.propTypes = {
	i18n: PropTypes.object
}

export default withTranslation()(Localization)
