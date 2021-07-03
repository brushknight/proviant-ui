import * as Classes from '@blueprintjs/core/lib/esnext/common/classes'
import * as React from 'react'
import { AnchorButton, Dialog, Intent } from '@blueprintjs/core'
import PropTypes from 'prop-types'

const Popover = (props) => {
	const dialogState = {
		autoFocus: true,
		canEscapeKeyClose: true,
		canOutsideClickClose: true,
		enforceFocus: true,
		isOpen: props.isOpen,
		usePortal: true,
		title: props.title,
		onClose: props.onClose
	}

	return (
		<Dialog
			{...dialogState}
		>
			<div className={Classes.DIALOG_BODY}>
				{props.children}
			</div>
			<div className={Classes.DIALOG_FOOTER}>
				<div className={Classes.DIALOG_FOOTER_ACTIONS}>
					<AnchorButton
						intent={Intent.DANGER}
						target="_blank"
						icon={'delete'}
						minimal={true}
						onClick={props.onDelete}
					>
						Delete
					</AnchorButton>

					<AnchorButton
						intent={Intent.NONE}
						target="_blank"
						minimal={true}
						icon={'cross'}
						onClick={props.onClose}
					>
						Close
					</AnchorButton>
					<AnchorButton
						intent={Intent.SUCCESS}
						target="_blank"
						minimal={true}
						icon={'tick'}
						onClick={props.onSave}
					>
						Save
					</AnchorButton>

				</div>
			</div>
		</Dialog>
	)
}

Popover.propTypes = {
	isOpen: PropTypes.bool,
	children: PropTypes.object,
	title: PropTypes.string,
	onClose: PropTypes.func,
	onDelete: PropTypes.func,
	onSave: PropTypes.func
}

export default Popover
