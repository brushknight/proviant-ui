import * as React from 'react'
import { Spinner } from '@blueprintjs/core'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const SectionLoading = (props) => {
	return (
		<section className="content">
			<Spinner/>
		</section>
	)
}

SectionLoading.propTypes = {
	i18n: PropTypes.object
}

export default withTranslation('translations')(SectionLoading)
