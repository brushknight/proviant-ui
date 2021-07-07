import * as React from 'react'
import { Spinner } from '@blueprintjs/core'
import { withTranslation } from 'react-i18next'

const SectionLoading = (props) => {
	return (
		<section className="content">
			<Spinner/>
		</section>
	)
}

export default withTranslation('translations')(SectionLoading)
