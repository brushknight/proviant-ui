import * as React from 'react'
import { apiTokensFetch } from '../../../common/redux/actions/auth/apiTokens'
import { apiTokenSubmitForm } from '../../../common/redux/actions/auth/apiTokenForm'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getApiTokenForm, getApiTokens } from '../../../common/redux/selectors'
import { Intent, Overlay } from '@blueprintjs/core'
import { STATUS_DEFAULT } from '../../../common/redux/reducers/consts'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import Button from '../generic/Button'
import LanguagePicker from '../generic/LanguagePicker'
import OverlayCloseButton from '../generic/OverlayCloseButton'
import PropTypes from 'prop-types'

const Profile = (
	{
		apiTokenForm,
		apiTokens,
		apiTokensFetch,
		apiTokenSubmitForm,
		t
	}
) => {
	const [isOpen, setIsOpen] = useState(false)
	const history = useHistory()

	useEffect(() => {
		setIsOpen(true)

		if (apiTokenForm.status === STATUS_DEFAULT) {
			apiTokensFetch()
		}
	}, [apiTokenForm.status])

	const onClose = () => {
		history.goBack()
	}

	const closePopover = () => {
		setIsOpen(false)
		onClose()
	}

	return (
		<Overlay
			isOpen={isOpen}
			onClose={() => {
				onClose()
			}}
		>
			<div className={'product-overlay'}>
				<OverlayCloseButton onClick={closePopover}/>
				<div className={'product-overlay__inner product-overlay__inner--fixed'}>
					<h1>{t('profile.title')}</h1>
					<h2>
						{t('profile.api_tokens.title')}
						<Button onClick={apiTokenSubmitForm} intent={Intent.PRIMARY} text={t('profile.api_tokens.button_generate_new')}/>
					</h2>
					{apiTokens.items.map(token => (
						<div className={'profile-api-token'} key={token.id}>{t('profile.api_tokens.token_legend')}
							<input className={'profile-api-token__input'} value={token.id} readOnly={true} onClick={(e) => {
								e.target.select()
							}}/>
						</div>
					))}
				</div>
				<LanguagePicker className={'profile__language-picker'}/>
			</div>

		</Overlay>
	)
}

Profile.propTypes = {
	apiTokens: PropTypes.object,
	apiTokenForm: PropTypes.object,
	apiTokensFetch: PropTypes.func,
	apiTokenSubmitForm: PropTypes.func,
	t: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
	const apiTokens = getApiTokens(state)
	const apiTokenForm = getApiTokenForm(state)
	const t = ownProps.i18n.t.bind(ownProps.i18n)

	return {
		apiTokens,
		apiTokenForm,
		t
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = ownProps.i18n.language
	return {
		apiTokensFetch: () => dispatch(apiTokensFetch(locale)),
		apiTokenSubmitForm: () => dispatch(apiTokenSubmitForm(locale))
	}
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(Profile)
