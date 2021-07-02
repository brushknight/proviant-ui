import * as Classes from '@blueprintjs/core/lib/esnext/common/classes'
import * as React from 'react'
import { AnchorButton, Callout, Dialog, Intent } from '@blueprintjs/core'
import PropTypes from 'prop-types'

const Popover = (props) => {
  const dialogState = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: true,
    usePortal: true
  }

  return (
		<Dialog
			{...dialogState}
		>
			<div className={Classes.DIALOG_BODY}>
				test
			</div>
			<div className={Classes.DIALOG_FOOTER}>
				<div className={Classes.DIALOG_FOOTER_ACTIONS}>
					<AnchorButton
						intent={Intent.DANGER}
						href=""
						target="_blank"
						icon={'delete'}
						minimal={true}
					>
						Delete
					</AnchorButton>
					<AnchorButton
						intent={Intent.SUCCESS}
						href=""
						target="_blank"
						minimal={true}
						icon={'tick'}
					>
						Save
					</AnchorButton>
					<AnchorButton
						intent={Intent.NONE}
						href=""
						target="_blank"
						minimal={true}
						icon={'cross'}
					>
						Close
					</AnchorButton>

				</div>
			</div>
		</Dialog>
  )
}

Popover.propTypes = {
  error: PropTypes.string
}

export default Popover
