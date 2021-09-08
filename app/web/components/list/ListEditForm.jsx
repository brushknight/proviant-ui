import * as React from 'react'
import { Alert, Button, ButtonGroup, Callout, InputGroup, Intent, Spinner } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { deleteList, editListReset, fetchEditList, updateList } from '../../../common/redux/actions/editList'
import { GA_PAGE_LIST_EDIT, pageView } from '../../../common/utils/ga'
import { getEditList } from '../../../common/redux/selectors'
import {
	STATUS_DEFAULT,
	STATUS_DELETED,
	STATUS_EDITING,
	STATUS_ERROR,
	STATUS_FETCH_FAILED,
	STATUS_FETCHED,
	STATUS_FETCHING,
	STATUS_UPDATED
} from '../../../common/redux/reducers/consts'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const ListEditForm = ({ form, fetch, reset, update, remove, t, className }) => {
	const history = useHistory()
	const { id } = useParams()
	const [title, setTitle] = useState('')
	const [formStatus, setFormStatus] = useState(form.status)
	const [deleteAlert, setDeleteAlert] = useState(false)

	const formReset = () => {
		setTitle('')
		setFormStatus(STATUS_DEFAULT)
		reset()
	}

	const onClose = () => {
		history.push('/list/' + id)
		formReset()
	}

	const onSubmit = (e) => {
		e.preventDefault()
		update(Number(id), title)
		formReset()
	}

	const onDelete = () => {
		remove(Number(id))
	}

	useEffect(() => {
		if (Number(form.model.id) > 0 && Number(form.model.id) !== Number(id)) {
			formReset()
		}

		if (form.status === STATUS_DEFAULT) {
			formReset()
			setTitle('')
			fetch(Number(id))
		}

		if (form.status === STATUS_FETCHED) {
			setTitle(form.model.title)
		}

		if (form.status === STATUS_UPDATED) {
			setTitle(form.model.title)
		}

		setFormStatus(form.status)
	}, [
		id, form.status
	])

	let intent = Intent.NONE

	if (formStatus === STATUS_UPDATED) {
		onClose()
	}

	if (formStatus === STATUS_DELETED) {
		history.push('/')
		formReset()
	}

	if (formStatus === STATUS_ERROR || formStatus === STATUS_FETCH_FAILED) {
		intent = Intent.DANGER
	}

	if (form.status === STATUS_FETCHING) {
		return (
			<div className={className}>
				<Spinner
					size={80}
				/>
			</div>
		)
	}

	let error

	if (form.status === STATUS_ERROR) {
		error = (
			<Callout intent={Intent.DANGER}>
				{form.error}
			</Callout>
		)
	}

	if (form.status === STATUS_FETCH_FAILED) {
		return (
			<div className={className}>
				<Callout intent={Intent.DANGER}>
					{form.error}
				</Callout>
			</div>
		)
	}

	// let showProgress
	//
	// if (form.status === STATUS_SENDING) {
	// 	showProgress = true
	// }

	pageView(GA_PAGE_LIST_EDIT)

	return (
		<form
			className={className}
			onSubmit={onSubmit}
		>
			<Alert
				cancelButtonText={t('edit_list_form.button_cancel')}
				confirmButtonText={t('edit_list_form.button_delete')}
				icon="delete"
				intent={Intent.DANGER}
				isOpen={deleteAlert}
				onCancel={() => {
					setDeleteAlert(false)
				}}
				onClose={() => {
					setDeleteAlert(false)
				}}
				canOutsideClickCancel={true}
				onConfirm={() => {
					onDelete()
				}}
				canEscapeKeyCancel={true}
			>
				<p>
					{t('edit_list_form.delete_confirmation')} <br/>
					<b>{title}</b>
				</p>
			</Alert>
			{error}
			<h1>{t('edit_list_form.title')}</h1>
			<InputGroup
				autoFocus={true}
				placeholder={t('edit_list_form.placeholder')}
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
					intent={Intent.DANGER}
					icon={'delete'}
					text={t('edit_list_form.button_delete')}
					onClick={() => {
						setDeleteAlert(true)
					}}
				/>
				<Button
					large={true}
					minimal={true}
					intent={Intent.NONE}
					icon={'cross'}
					text={t('edit_list_form.button_cancel')}
					onClick={onClose}
				/>
				<Button
					type={'submit'}
					large={true}
					minimal={true}
					intent={Intent.SUCCESS}
					icon={'tick'}
					text={t('edit_list_form.button_save')}
				/>
			</ButtonGroup>
		</form>
	)
}

ListEditForm.propTypes = {
	form: PropTypes.object,
	fetch: PropTypes.func,
	reset: PropTypes.func,
	update: PropTypes.func,
	remove: PropTypes.func,
	t: PropTypes.func,
	className: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
	const form = getEditList(state)
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	const className = ownProps.className
	return { form, t, className }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		fetch: (id) => dispatch(fetchEditList(id, locale)),
		update: (id, title) => dispatch(updateList(id, title, locale)),
		reset: (id) => dispatch(editListReset(id, locale)),
		remove: (id) => dispatch(deleteList(id, locale))
	}
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ListEditForm)
