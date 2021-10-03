import { connect } from 'react-redux'
import { getAllUrlParams } from '../../../common/utils/link'
import { Linking, View } from 'react-native'
import { obtainJWT } from '../../../common/redux/actions/auth/obtainJWT'
import PropTypes from 'prop-types'
import React from 'react'

const Deeplink = ({ obtainJWT }) => {
	Linking.addEventListener('url', (data) => {
		const params = getAllUrlParams(data.url)
		const linkId = params.link_id

		console.log(linkId)

		if (linkId) {
			obtainJWT(linkId)
		}
	})

	return (
		<View/>
	)
}

const mapStateToProps = (state, ownProps) => {
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const locale = 'en'
	return {
		obtainJWT: (linkId) => dispatch(obtainJWT(linkId, locale))

	}
}

Deeplink.propTypes = {
	obtainJWT: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Deeplink)
