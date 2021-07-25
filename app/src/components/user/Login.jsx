import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../redux/selectors'
import { InputGroup, Overlay } from '@blueprintjs/core'
import { STATUS_UNAUTHORIZED } from '../../redux/reducers/consts'
import { withTranslation } from 'react-i18next'
import Button from '../generic/Button'
import PropTypes from 'prop-types'

const Login = ({ user }) => {
	return (
		<Overlay
			isOpen={user.status === STATUS_UNAUTHORIZED}
			onClose={() => {
			}}
		>
			<section className={'auth-form'}>
				<div className={'auth-form__inner'}>
					<InputGroup/>
					<Button className={'button--login'} text={'Login'}/>
				</div>
			</section>
		</Overlay>
	)
}

const mapStateToProps = (state, ownProps) => {
	const t = ownProps.i18n.t.bind(ownProps.i18n)
	const user = getUser(state)
	return { t, user }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		locale
	}
}

Login.propTypes = {
	user: PropTypes.object
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(Login)
