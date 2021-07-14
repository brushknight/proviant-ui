import * as React from 'react'
import { Button, ButtonGroup, Callout, InputGroup, Intent } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createList, resetCreateListForm } from '../../redux/actions/lists'
import { getLists } from '../../redux/selectors'
import { STATUS_CREATED, STATUS_DEFAULT, STATUS_EDITING, STATUS_ERROR } from '../../redux/reducers/consts'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const ListCreateForm = ({ form, create, reset, t, className }) => {
	const history = useHistory()
	const [title, setTitle] = useState('')
	const [formStatus, setFormStatus] = useState(form.status)

	const onClose = () => {
		history.goBack()
		reset()
	}

	const onCreate = () => {
		create(title)
	}

	useEffect(() => {
		if (form.status === STATUS_DEFAULT) {
			setTitle('')
		}

		setFormStatus(form.status)
	}, [
		form.status
	])

	let intent = Intent.NONE

	if (formStatus === STATUS_CREATED) {
		history.push('/list/' + form.model.id)
		reset()
	}

	if (formStatus === STATUS_ERROR) {
		intent = Intent.DANGER
	}

	let error

	if (formStatus === STATUS_ERROR) {
		error = (
			<Callout intent={Intent.DANGER}>
				{form.error}
			</Callout>
		)
	}

	return (
		<form className={className}>
			{error}
			<h1>{t('create_list_form.title')}</h1>
			<InputGroup
				placeholder={t('create_list_form.placeholder')}
				leftIcon={'tag'}
				value={title}
				intent={intent}
				onChange={(e) => {
					setTitle(e.target.value)
					setFormStatus(STATUS_EDITING)
				}}
			/>
			<ButtonGroup>
				<Button
					large={true}
					minimal={true}
					intent={Intent.NONE}
					icon={'cross'}
					text={t('create_list_form.button_cancel')}
					onClick={onClose}
				/>
				<Button
					large={true}
					minimal={true}
					intent={Intent.SUCCESS}
					icon={'tick'}
					text={t('create_list_form.button_save')}
					onClick={onCreate}
				/>
			</ButtonGroup>
		</form>
	)
}

ListCreateForm.propTypes = {
	form: PropTypes.object,
	create: PropTypes.func,
	reset: PropTypes.func,
	t: PropTypes.func,
	className: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
	const form = getLists(state).createForm
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	const className = ownProps.className
	return { form, t, className }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		create: (title) => dispatch(createList(title, locale)),
		reset: () => dispatch(resetCreateListForm())
	}
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ListCreateForm)
