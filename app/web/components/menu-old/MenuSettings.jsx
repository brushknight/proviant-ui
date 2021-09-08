import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchUser } from '../../../common/redux/actions/user'
import { getUser } from '../../../common/redux/selectors'
import { Icon, Spinner } from '@blueprintjs/core'
import { STATUS_LOADED } from '../../../common/redux/reducers/consts'
import { withTranslation } from 'react-i18next'
import LanguagePicker from '../generic/LanguagePicker'
import PropTypes from 'prop-types'

const MenuSettings = ({ t, i18n, user, fetchUser }) => {
	if (user.status !== STATUS_LOADED) {
		return (
			<ul className={'menu menu--bottom'}>
				<LanguagePicker className={''}/>
				<Spinner size={16}/>
			</ul>
		)
	}

	const userEmail = user.model ? user.model.email : ''

	return (
		<ul className={'menu menu--bottom'}>
			<LanguagePicker className={''}/>
			<li className={'menu__item'}><Icon icon={'cog'}/>{userEmail}</li>
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
