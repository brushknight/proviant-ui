import * as React from 'react'
import {useState} from 'react'
import PropTypes from "prop-types";
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";

const AddItemForm = ({className, t, quickAction, action, fields, buttonText}) => {

    const [title, setTitle] = useState('')
    const [quantity, setQuantity] = useState(1)


    const onSubmit = (e) => {
        e.preventDefault()
        action({
            title,
            quantity
        })
    }

    let fieldsJsx = []

    if (fields.title) {
        fieldsJsx.push((
            <input
                className={'item-addition__form-input'}
                placeholder={fields.title}
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
            />
        ))
    }

    if (fields.quantity) {
        fieldsJsx.push((
            <input
                className={'item-addition__form-input'}
                type={'number'}
                placeholder={fields.quantity}
                value={quantity}
                onChange={(e) => {
                    setQuantity(Number(e.target.value))
                }}
            />
        ))
    }

    if (!className) {
        className = ''
    }

    return (
        <div className={'item-addition ' + className}>
            <button className={'item-addition__button'} onClick={quickAction}>
                <svg className={'item-addition__button-svg'} data-icon="plus" width="16" height="16"
                     viewBox="0 0 16 16">
                    <path className={'item-addition__button-path'}
                          d="M13 7H9V3c0-.55-.45-1-1-1s-1 .45-1 1v4H3c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1V9h4c.55 0 1-.45 1-1s-.45-1-1-1z"
                          fillRule="evenodd"></path>
                </svg>
            </button>
            <form className={'item-addition__form'} onSubmit={onSubmit}>
                {fieldsJsx}
                <button className={'item-addition__form-button'} type={'submit'}>
                    <svg className={'item-addition__button-svg'} data-icon="plus" width="16" height="16"
                         viewBox="0 0 16 16">
                        <path className={'item-addition__button-path'}
                              d="M13 7H9V3c0-.55-.45-1-1-1s-1 .45-1 1v4H3c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1V9h4c.55 0 1-.45 1-1s-.45-1-1-1z"
                              fillRule="evenodd"></path>
                    </svg>
                    <span className={'item-addition__button-text'}>{t(buttonText)}</span>
                </button>
            </form>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const t = ownProps.i18n.t.bind(ownProps.i18n)
    const i18n = ownProps.i18n
    const quickAction = ownProps.quickAction
    const action = ownProps.action
    const fields = ownProps.fields || []
    const buttonText = ownProps.buttonText || 'global.button_add'
    return {t, i18n, quickAction, action, fields, buttonText}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const locale = ownProps.i18n.language

    return {}
}

AddItemForm.propTypes = {
    t: PropTypes.func,
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(AddItemForm)