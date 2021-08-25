import * as React from 'react'
import {getUser} from "../../redux/selectors";
import PropTypes from "prop-types";
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {STATUS_LOADED} from "../../redux/reducers/consts";
import LanguagePicker from "../generic/LanguagePicker";
import {Spinner} from "@blueprintjs/core";

const Profile = ({user}) => {
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
        <div className={'page-header__profile-link profile-link'}>
            <span className={'profile-link__email'}>{userEmail}</span>
            <a className={'profile-link__link'}>
                <svg className={'profile-link__svg'} data-icon="user" width="16" height="16" viewBox="0 0 16 16">
                    <path className={'profile-link__path'} d="M7.99-.01A7.998 7.998 0 00.03 8.77c.01.09.03.18.04.28.02.15.04.31.07.47.02.11.05.22.08.34.03.13.06.26.1.38.04.12.08.25.12.37.04.11.08.21.12.32a6.583 6.583 0 00.3.65c.07.14.14.27.22.4.04.07.08.13.12.2l.27.42.1.13a7.973
					7.973 0 003.83 2.82c.03.01.05.02.07.03.37.12.75.22 1.14.29l.2.03c.39.06.79.1 1.2.1s.81-.04 1.2-.1l.2-.03c.39-.07.77-.16 1.14-.29.03-.01.05-.02.07-.03a8.037 8.037 0 003.83-2.82c.03-.04.06-.08.09-.13.1-.14.19-.28.28-.42.04-.07.08-.13.12-.2.08-.13.15-.27.22-.41.04-.08.08-.17.12-.26.06-.13.11-.26.17-.39.04-.1.08-.21.12-.32.04-.12.08-.24.12-.37.04-.13.07-.25.1-.38.03-.11.06-.22.08-.34.03-.16.05-.31.07-.47.01-.09.03-.18.04-.28.02-.26.04-.51.04-.78-.03-4.41-3.61-7.99-8.03-7.99zm0 14.4c-1.98 0-3.75-.9-4.92-2.31.67-.36 1.49-.66
					2.14-.95 1.16-.52 1.04-.84 1.08-1.27.01-.06.01-.11.01-.17-.41-.36-.74-.86-.96-1.44v-.01c0-.01-.01-.02-.01-.02-.05-.13-.09-.26-.12-.39-.28-.05-.44-.35-.5-.63-.06-.11-.18-.38-.15-.69.04-.41.2-.59.38-.67v-.06c0-.51.05-1.24.14-1.72.02-.13.05-.26.09-.39.17-.59.53-1.12 1.01-1.49.49-.38 1.19-.59 1.82-.59.62 0 1.32.2 1.82.59.48.37.84.9 1.01 1.49.04.13.07.26.09.4.09.48.14 1.21.14 1.72v.07c.18.08.33.26.37.66.03.31-.1.58-.16.69-.06.27-.21.57-.48.62-.03.13-.07.26-.12.38 0 .01-.01.04-.01.04-.21.57-.54 1.06-.94 1.42
					0 .06.01.13.01.19.04.43-.12.75 1.05 1.27.65.29 1.47.6 2.14.95a6.415 6.415 0 01-4.93 2.31z"
                          fillRule="evenodd"></path>
                </svg>
            </a>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const t = ownProps.i18n.t.bind(ownProps.i18n)
    const i18n = ownProps.i18n
    const user = getUser(state)
    return {t, i18n, user}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const locale = ownProps.i18n.language

    return {}
}

Profile.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object,
    user: PropTypes.object,
    fetchUser: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(Profile)