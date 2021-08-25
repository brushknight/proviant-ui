import * as React from 'react'
import PropTypes from "prop-types";
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";

const AddProductForm = ({className, t}) => {

    const history = useHistory()
    const location = useLocation()
    let newProductUrl = location.pathname
    if (newProductUrl.slice(-1) !== '/') {
        newProductUrl += '/'
    }

    newProductUrl += 'product-new'

    const onClick = () => {
        history.push(newProductUrl)
    }

    return (
        <div className={'product-addition ' + className}>
            <button className={'product-addition__button'} onClick={onClick}>
                <svg className={'product-addition__button-svg'} data-icon="plus" width="16" height="16"
                     viewBox="0 0 16 16">
                    <path className={'product-addition__button-path'}
                          d="M13 7H9V3c0-.55-.45-1-1-1s-1 .45-1 1v4H3c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1V9h4c.55 0 1-.45 1-1s-.45-1-1-1z"
                          fillRule="evenodd"></path>
                </svg>
            </button>
            <div className={'product-addition__form'}>
                <input
                    className={'product-addition__form-input'}
                    placeholder={'Product title'}
                />
                <button className={'product-addition__form-button'} onClick={onClick}>
                    <svg className={'product-addition__button-svg'} data-icon="plus" width="16" height="16"
                         viewBox="0 0 16 16">
                        <path className={'product-addition__button-path'}
                              d="M13 7H9V3c0-.55-.45-1-1-1s-1 .45-1 1v4H3c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1V9h4c.55 0 1-.45 1-1s-.45-1-1-1z"
                              fillRule="evenodd"></path>
                    </svg>
                    <span className={'product-addition__button-text'}>{t('global.button_add_product')}</span>
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const t = ownProps.i18n.t.bind(ownProps.i18n)
    const i18n = ownProps.i18n
    return {t, i18n}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const locale = ownProps.i18n.language

    return {}
}

AddProductForm.propTypes = {
    t: PropTypes.func,
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(AddProductForm)