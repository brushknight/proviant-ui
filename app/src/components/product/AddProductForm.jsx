import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createProductWithTitle } from '../../redux/actions/createProduct'
import { useHistory, useLocation } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import AddItemForm from '../header/AddItemForm'
import PropTypes from 'prop-types'

const AddProductForm = ({ className, t, createWithTitle }) => {
	const history = useHistory()
	const location = useLocation()
	let newProductUrl = location.pathname
	if (newProductUrl.slice(-1) !== '/') {
		newProductUrl += '/'
	}

	newProductUrl += 'product-new'

	const quickAction = () => {
		history.push(newProductUrl)
	}

	const action = (title) => {
		createWithTitle(title)
		history.push(newProductUrl)
	}

	return (
		<AddItemForm
			fields={
				{
					title: 'Product title'
				}
			}
			className={className}
			action={(dto) => {
				action(dto.title)
			}}
			quickAction={quickAction}
		/>
	)
}

const mapStateToProps = (state, ownProps) => {
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	const i18n = ownProps.i18n

	return { t, i18n }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language

	return {
		createWithTitle: (title) => dispatch(createProductWithTitle(title))
	}
}

AddProductForm.propTypes = {
	t: PropTypes.func,
	className: PropTypes.string,
	createWithTitle: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(AddProductForm)
