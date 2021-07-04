import * as React from 'react'
import { Button, Callout, InputGroup, Intent, Spinner, SpinnerSize } from '@blueprintjs/core'
import { STATUS_DEFAULT, STATUS_ERROR, STATUS_LOADING } from '../../redux/reducers/consts'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const CreateForm = (props) => {
	const [title, setTitle] = useState('')
	const [isError, setIsError] = useState(props.error)

	useEffect(() => {
		if (props.status === STATUS_DEFAULT) {
			setTitle('')
		}
		if (props.status === STATUS_ERROR) {
			setIsError(true)
		}

		if (props.status === STATUS_LOADING) {
			button = <Spinner size={SpinnerSize.SMALL}/>
		}
	}, [props.status])

	let button = (
		<Button
			minimal={true}
			icon="plus"
			type={'submit'}
			disabled={props.status === STATUS_LOADING}
		/>
	)

	let intent = Intent.NONE
	let errorCallout
	if (isError) {
		intent = Intent.DANGER
		errorCallout = <Callout intent={Intent.DANGER} icon={null}>{props.error}</Callout>
	}

	const onSubmit = (e) => {
		e.preventDefault()
		props.onSubmit(title)
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<InputGroup
					placeholder={props.placeholder}
					rightElement={button}
					leftIcon={props.icon}
					value={title}
					intent={intent}
					onChange={(e) => {
						setIsError(false)
						setTitle(e.target.value)
					}}
				/>
				{errorCallout}
			</form>

		</div>
	)
}

CreateForm.propTypes = {
	onSubmit: PropTypes.func,
	onChange: PropTypes.func,
	onReset: PropTypes.func,
	status: PropTypes.string,
	error: PropTypes.string,
	placeholder: PropTypes.string,
	icon: PropTypes.string,
	value: PropTypes.string
}
