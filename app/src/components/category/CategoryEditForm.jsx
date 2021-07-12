import * as React from 'react'
import { Button, ButtonGroup, Callout, InputGroup, Intent, Spinner } from '@blueprintjs/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { deleteCategory, editCategoryReset, fetchEditCategory, updateCategory } from '../../redux/actions/editCategory'
import { getEditCategory } from '../../redux/selectors'
import {
	STATUS_DEFAULT,
	STATUS_DELETED,
	STATUS_EDITING,
	STATUS_ERROR,
	STATUS_FETCH_FAILED,
	STATUS_FETCHED,
	STATUS_FETCHING,
	STATUS_UPDATED
} from '../../redux/reducers/consts'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const CategoryEditForm = ({ form, fetch, reset, update, remove, t, className }) => {
	const history = useHistory()
	const { id } = useParams()
	const [title, setTitle] = useState('')
	const [formStatus, setFormStatus] = useState(form.status)

	const onClose = () => {
		history.push('/category/' + id)
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

	return (
		<form className={className}>
			{error}
			<h1>{t('edit_category_form.title')}</h1>
			<InputGroup
				placeholder={t('edit_category_form.placeholder')}
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
					intent={Intent.DANGER}
					icon={'delete'}
					text={t('category_edit.button_delete')}
					onClick={onDelete}
				/>
				<Button
					large={true}
					minimal={true}
					intent={Intent.NONE}
					icon={'cross'}
					text={t('category_edit.button_cancel')}
					onClick={onClose}
				/>
				<Button
					large={true}
					minimal={true}
					intent={Intent.SUCCESS}
					icon={'tick'}
					text={t('category_edit.button_save')}
					onClick={onSave}
				/>
			</ButtonGroup>
		</form>
	)
}

CategoryEditForm.propTypes = {
	form: PropTypes.object,
	fetch: PropTypes.func,
	reset: PropTypes.func,
	update: PropTypes.func,
	remove: PropTypes.func,
	t: PropTypes.func,
	className: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
	const form = getEditCategory(state)
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	const className = ownProps.className
	return { form, t, className }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		fetch: (id) => dispatch(fetchEditCategory(id, locale)),
		update: (id, title) => dispatch(updateCategory(id, title, locale)),
		reset: (id) => dispatch(editCategoryReset(id, locale)),
		remove: (id) => dispatch(deleteCategory(id, locale))
	}
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(CategoryEditForm)
