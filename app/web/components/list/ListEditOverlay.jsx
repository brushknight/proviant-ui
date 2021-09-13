import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { editListReset } from '../../../common/redux/actions/editList'
import { Overlay } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import ListEditForm from './ListEditForm'
import OverlayCloseButton from '../generic/OverlayCloseButton'
import PropTypes from 'prop-types'

const ListEditOverlay = ({ filterType, reset }) => {
	const { id } = useParams()
	const [isOpen, setIsOpen] = useState(false)
	const history = useHistory()

	useEffect(() => {
		setIsOpen(true)
	}, [id])

	const onClose = () => {
		history.goBack()
		reset()
	}

	const closePopover = () => {
		setIsOpen(false)
		onClose()
	}

	return (
		<Overlay
			isOpen={isOpen}
			onClose={() => {
				onClose()
			}}
		>
			<div className={'product-overlay'}>
				<OverlayCloseButton onClick={closePopover}/>
				<ListEditForm
					className={'product-overlay__inner product-overlay__inner--fixed'}
				/>
			</div>
		</Overlay>
	)
}

ListEditOverlay.propTypes = {
	filterType: PropTypes.string,
	reset: PropTypes.func
}
const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		reset: (id) => dispatch(editListReset(id, locale))
	}
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ListEditOverlay)
