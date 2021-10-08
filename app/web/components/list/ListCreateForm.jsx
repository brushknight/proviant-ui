import * as React from 'react'
import { Button, ButtonGroup, Callout, InputGroup, Intent } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createList, resetCreateListForm } from '../../../common/redux/actions/list/lists'
import { GA_PAGE_LIST_CREATE, pageView } from '../../../common/utils/ga'
import { getLists } from '../../../common/redux/selectors'
import { STATUS_CREATED, STATUS_DEFAULT, STATUS_EDITING, STATUS_ERROR } from '../../../common/redux/reducers/consts'
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

	const onSubmit = (e) => {
		e.preventDefault()
		create(title)
		reset()
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

	pageView(GA_PAGE_LIST_CREATE)

	return (
		<form
			className={className}
			onSubmit={onSubmit}
		>
			{error}
			<h1>{t('create_list_form.title')}</h1>
			<InputGroup
				autoFocus={true}
				placeholder={t('create_list_form.placeholder')}
				leftIcon={'list'}
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
					type={'submit'}
					large={true}
					minimal={true}
					intent={Intent.SUCCESS}
					icon={'tick'}
					text={t('create_list_form.button_create')}
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
