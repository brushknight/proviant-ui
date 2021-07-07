import * as React from 'react'
import { Callout, Intent } from '@blueprintjs/core'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const SectionError = (props) => {
	return (
		<section className="content">
			<Callout title={props.i18n.t('global.ooops')} intent={Intent.DANGER}>
				{props.error}
			</Callout>
		</section>
	)
}

SectionError.propTypes = {
	error: PropTypes.string,
	i18n: PropTypes.object
}

export default withTranslation('translations')(SectionError)
