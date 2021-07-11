import * as React from 'react'
import { Icon } from '@blueprintjs/core'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const ProductsOverlayCloseButton = ({ onClick }) => {
	return (
		<button className='product-overlay__button-back' onClick={onClick}>
			<Icon iconSize={32} icon={'cross'}/>
		</button>
	)
}

ProductsOverlayCloseButton.propTypes = {
	onClick: PropTypes.func
}

export default withTranslation('translations')(ProductsOverlayCloseButton)
