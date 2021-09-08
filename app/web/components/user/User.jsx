import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchUser } from '../../../common/redux/actions/user'
import { getLocale, getUser } from '../../../common/redux/selectors'
import { useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const User = ({ t, i18n, user, fetchUser, locale }) => {
	useEffect(() => {
		fetchUser()
		i18n.changeLanguage(locale)
	}, [user.status])

	return (<div/>)
}

const mapStateToProps = (state, ownProps) => {
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	const i18n = ownProps.i18n
	const locale = getLocale(state)
	const user = getUser(state)
	return { t, i18n, user, locale }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language

	return {
		fetchUser: () => dispatch(fetchUser(locale))
	}
}

User.propTypes = {
	t: PropTypes.func,
	i18n: PropTypes.object,
	user: PropTypes.object,
	fetchUser: PropTypes.func,
	locale: PropTypes.string
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(User)
