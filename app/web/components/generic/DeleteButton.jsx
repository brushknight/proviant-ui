import * as React from 'react'
import { Button, Intent } from '@blueprintjs/core'
import { useState } from 'react'
import PropTypes from 'prop-types'

const DeleteButton = ({ onDelete, className, text, confirmationText }) => {
	const [deleteConfirmation, setDeleteConfirmation] = useState(false)

	const deleteConfirmationBtn = (
		<Button className={className} onClick={() => {
			onDelete()
		}} icon={'delete'} minimal={false} intent={Intent.DANGER}>
			{confirmationText}
		</Button>
	)

	const deleteDefaultBtn = (
		<Button className={className} onClick={() => {
			setDeleteConfirmation(true)
		}} icon={'delete'} minimal={true} intent={Intent.DANGER}>
			{text}
		</Button>
	)

	return deleteConfirmation ? deleteConfirmationBtn : deleteDefaultBtn
}

Button.propTypes = {
	text: PropTypes.string,
	confirmationText: PropTypes.string,
	onDelete: PropTypes.func,
	className: PropTypes.string
}

export default DeleteButton
