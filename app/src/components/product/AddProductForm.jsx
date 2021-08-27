import * as React from 'react'
import PropTypes from "prop-types";
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import AddItemForm from "../header/AddItemForm";

const AddProductForm = ({className, t}) => {
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

    return (
        <AddItemForm
            fields={
                {
                    title: 'Product title'
                }
            }
            className={className}
            action={(dto) => {
                console.log(dto)
            }}
            quickAction={quickAction}
        />
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