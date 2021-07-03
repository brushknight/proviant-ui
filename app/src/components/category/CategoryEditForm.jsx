import * as React from 'react'
import { Callout, InputGroup, Intent } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { editCategoryReset, fetchEditCategory, updateCategory } from '../../redux/actions/editCategory'
import { getEditCategory } from '../../redux/selectors'
import {
	STATUS_DEFAULT, STATUS_EDITING,
	STATUS_ERROR,
	STATUS_FETCH_FAILED,
	STATUS_FETCHED, STATUS_SENDING, STATUS_SUCCESS,
	STATUS_UPDATED
} from '../../redux/reducers/consts'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Popover from '../Popover'
import PropTypes from 'prop-types'

const CategoryEditForm = ({ form, fetch, reset, update }) => {
	const history = useHistory()
	const { id } = useParams()
	const [title, setTitle] = useState('')
	let showButtons = true
	let showProgress = false
	const [formStatus, setFormStatus] = useState(form.status)

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
		intent = Intent.SUCCESS
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
			placeholder={'Category title'}
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

	const onClose = () => {
		history.push('/category/' + id)
		reset()
	}

	const onSave = () => {
		update(Number(id), title)
	}

	return (
		<Popover
			isOpen={true}
			title={'Edit Category'}
			onClose={onClose}
			onSave={onSave}
			showButtons={showButtons}
			showProgress={showProgress}
		>
			{content}
			{error}

		</Popover>

	)
}

CategoryEditForm.propTypes = {
	form: PropTypes.object,
	fetch: PropTypes.func,
	reset: PropTypes.func,
	update: PropTypes.func
}

const mapStateToProps = state => {
	const form = getEditCategory(state)
	return { form }
}

const mapDispatchToProps = dispatch => {
	return {
		fetch: (id) => dispatch(fetchEditCategory(id)),
		update: (id, title) => dispatch(updateCategory(id, title)),
		reset: (id) => dispatch(editCategoryReset(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEditForm)
