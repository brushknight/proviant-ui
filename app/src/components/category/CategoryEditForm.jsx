import * as React from 'react'
import { Callout, InputGroup, Intent } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { editCategoryReset, fetchEditCategory, updateCategory } from '../../redux/actions/editCategory'
import { getEditCategory } from '../../redux/selectors'
import {
	STATUS_DEFAULT,
	STATUS_ERROR,
	STATUS_FETCH_FAILED,
	STATUS_FETCHED,
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
	}, [
		id, form.status
	])

	let intent = Intent.NONE

	let error

	if (form.status === STATUS_ERROR) {
		intent = Intent.DANGER
		error = (
			<Callout>
				{form.error}
			</Callout>
		)
	}

	if (form.status === STATUS_FETCH_FAILED) {
		intent = Intent.DANGER
		error = (
			<Callout>
				{form.error}
			</Callout>
		)
	}

	if (form.status === STATUS_UPDATED) {
		intent = Intent.SUCCESS
	}

	// if (form.status === STATUS_LOADING) {
	// 	button = <Spinner size={SpinnerSize.SMALL}/>
	// }
	//

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
		>
			<InputGroup
				placeholder={'Category title'}
				leftIcon={'tag'}
				value={title}
				intent={intent}
				onChange={(e) => {
					setTitle(e.target.value)
				}}
			/>
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
