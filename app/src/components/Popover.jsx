import * as Classes from '@blueprintjs/core/lib/esnext/common/classes'
import * as React from 'react'
import { AnchorButton, Dialog, Intent, Spinner, SpinnerSize } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const Popover = (props) => {
	const { t } = useTranslation()
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

	const buttons = []

	if (props.showProgress) {
		buttons.push((
			<Spinner
				size={SpinnerSize.SMALL}
			/>
		))
	}

	if (props.showButtons) {
		buttons.push((
			<AnchorButton
				intent={Intent.DANGER}
				target="_blank"
				icon={'delete'}
				minimal={true}
				onClick={props.onDelete}
			>
				{t('global.button_delete')}
			</AnchorButton>
		))
		buttons.push((
			<AnchorButton
				intent={Intent.NONE}
				target="_blank"
				minimal={true}
				icon={'cross'}
				onClick={props.onClose}
			>
				{t('global.button_close')}
			</AnchorButton>
		))
		buttons.push((
			<AnchorButton
				intent={Intent.SUCCESS}
				target="_blank"
				minimal={true}
				icon={'tick'}
				onClick={props.onSave}
			>
				{t('global.button_save')}
			</AnchorButton>
		))
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
					{buttons}
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
	onSave: PropTypes.func,
	showButtons: PropTypes.bool,
	showProgress: PropTypes.bool
}

export default Popover
