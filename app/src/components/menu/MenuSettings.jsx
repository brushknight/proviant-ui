import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchUser } from '../../redux/actions/user'
import { getUser } from '../../redux/selectors'
import { Icon, Spinner } from '@blueprintjs/core'
import { STATUS_LOADED, STATUS_UNAUTHORIZED } from '../../redux/reducers/consts'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import LanguagePicker from '../generic/LanguagePicker'
import PropTypes from 'prop-types'

const MenuSettings = ({ t, i18n, user, fetchUser }) => {
	const history = useHistory()

	useEffect(() => {
		fetchUser()
		if (user.model.locale) {
			i18n.changeLanguage(user.model.locale)
		}
	}, [user.status])

	if (user.status === STATUS_UNAUTHORIZED) {
		history.push('/login')
		return (<div/>)
	}

	if (user.status !== STATUS_LOADED) {
		return (
			<ul className={'menu'}>
				<Spinner size={16}/>
				<LanguagePicker className={'finish-auth__language-picker'}/>
			</ul>
		)
	}

	return (
		<ul className={'menu'}>
			<li className={'menu__item'}><Icon icon={'cog'}/>{user.model.email}</li>
			<LanguagePicker className={'finish-auth__language-picker'}/>
		</ul>
	)
}

const mapStateToProps = (state, ownProps) => {
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	const i18n = ownProps.i18n
	const user = getUser(state)
	return { t, i18n, user }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language

	return {
		fetchUser: () => dispatch(fetchUser(locale))
	}
}

MenuSettings.propTypes = {
	t: PropTypes.func,
	i18n: PropTypes.object,
	user: PropTypes.object,
	fetchUser: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(MenuSettings)
