import * as React from 'react'
import { Callout, InputGroup, Intent } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { deleteList, editListReset, fetchEditList, updateList } from '../../redux/actions/editList'
import { getEditList } from '../../redux/selectors'
import {
	STATUS_DEFAULT,
	STATUS_DELETED,
	STATUS_EDITING,
	STATUS_ERROR,
	STATUS_FETCH_FAILED,
	STATUS_FETCHED,
	STATUS_SENDING,
	STATUS_UPDATED
} from '../../redux/reducers/consts'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useTranslation, withTranslation } from 'react-i18next'
import Popover from '../Popover'
import PropTypes from 'prop-types'

const ListEditForm = ({ form, fetch, reset, update, remove }) => {
	const { t } = useTranslation()

	const history = useHistory()
	const { id } = useParams()
	const [title, setTitle] = useState('')
	let showButtons = true
	let showProgress = false
	const [formStatus, setFormStatus] = useState(form.status)

	const onClose = () => {
		history.push('/list/' + id)
		reset()
	}

	const onSave = () => {
		update(Number(id), title)
	}

	const onDelete = () => {
		remove(Number(id))
	}

	useEffect(() => {
		if (form.status === STATUS_DEFAULT) {
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
		reset()
	}

	if (formStatus === STATUS_ERROR || formStatus === STATUS_FETCH_FAILED) {
		intent = Intent.DANGER
	}

	let error

	if (form.status === STATUS_ERROR) {
		showButtons = true
		error = (
			<Callout intent={Intent.DANGER}>
				{form.error}
			</Callout>
		)
	}

	let content = (
		<InputGroup
			placeholder={t('edit_list_form.placeholder')}
			leftIcon={'tag'}
			value={title}
			intent={intent}
			onChange={(e) => {
				setTitle(e.target.value)
				setFormStatus(STATUS_EDITING)
			}}
		/>
	)

	if (form.status === STATUS_FETCH_FAILED) {
		content = null
		showButtons = false
		error = (
			<Callout intent={Intent.DANGER}>
				{form.error}
			</Callout>
		)
	}

	if (form.status === STATUS_SENDING) {
		showProgress = true
	}

	return (
		<Popover
			isOpen={true}
			title={t('edit_list_form.title')}
			onClose={onClose}
			onSave={onSave}
			onDelete={onDelete}
			showButtons={showButtons}
			showProgress={showProgress}
		>
			{content}
			{error}

		</Popover>

	)
}

ListEditForm.propTypes = {
	form: PropTypes.object,
	fetch: PropTypes.func,
	reset: PropTypes.func,
	update: PropTypes.func,
	remove: PropTypes.func
}

const mapStateToProps = state => {
	const form = getEditList(state)
	return { form }
}

const mapDispatchToProps = dispatch => {
	return {
		fetch: (id) => dispatch(fetchEditList(id)),
		update: (id, title) => dispatch(updateList(id, title)),
		reset: (id) => dispatch(editListReset(id)),
		remove: (id) => dispatch(deleteList(id))
	}
}

export default compose(withTranslation('translation'), connect(mapStateToProps, mapDispatchToProps))(ListEditForm)
