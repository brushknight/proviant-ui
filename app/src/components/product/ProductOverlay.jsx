import * as React from 'react'
import { Classes, Overlay } from '@blueprintjs/core'
import { useHistory, useParams } from 'react-router-dom'
import Product from './Product'

const ProductOverlay = () => {
	const { id, productId } = useParams()
	const history = useHistory()

	return (
		<Overlay
			isOpen={true}
			onClose={() => {
				history.push('/list/' + id)
			}}
		>
			<div className={'change_me-overlay-product-container'}>
				<div className={'change_me-overlay-product-container-inner'}>
					<Product/>

				</div>
			</div>

		</Overlay>
	)
}

export default ProductOverlay
