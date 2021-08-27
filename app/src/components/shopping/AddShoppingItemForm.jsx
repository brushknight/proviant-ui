import * as React from 'react'
import {useEffect, useState} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withTranslation} from 'react-i18next'
import PropTypes from 'prop-types'
import {getShoppingForm} from "../../redux/selectors";
import {shoppingFormSubmit} from "../../redux/actions/shopping/form";
import {STATUS_CREATED, STATUS_DEFAULT, STATUS_ERROR} from "../../redux/reducers/consts";
import {Callout, Intent} from "@blueprintjs/core";
import AddItemForm from "../header/AddItemForm";

const AddShoppingItemForm = ({submitForm, error, listId, status, t, className}) => {

    const [title, setTitle] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [errorInternal, setErrorInternal] = useState(null)
    const [statusInternal, setStatusInternal] = useState(null)

    const emptyForm = () => {
        setTitle('')
        setQuantity(1)
        setStatusInternal(STATUS_DEFAULT)
    }

    useEffect(() => {
            switch (status) {
                case STATUS_ERROR:
                    setErrorInternal(error)
                    break
            }

            setStatusInternal(status)
        },
        [status]
    )

    if (statusInternal === STATUS_CREATED) {
        emptyForm()
    }

    const action = (dto) => {
        submitForm(listId, dto)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        action({
            title,
            quantity
        })
    }

    let errorBlock

    if (errorInternal !== null) {
        errorBlock = (
            <Callout intent={Intent.DANGER}>{errorInternal}</Callout>
        )
    }

    return (
        <AddItemForm
            fields={
                {
                    title: 'Product title',
                    quantity: 'Quantity'
                }
            }
            className={className}
            quickAction={() => {}}
            action={action}
        />
    )
}

const mapStateToProps = (state, ownProps) => {
    const shoppingForm = getShoppingForm(state)

    const t = ownProps.i18n.t.bind(ownProps.i18n)
    return {
        status: shoppingForm.status,
        error: shoppingForm.error,
        t,
        listId: ownProps.listId
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const locale = ownProps.i18n.language
    return {
        submitForm: (listId, dto) => dispatch(shoppingFormSubmit(listId, dto, locale))
    }
}

AddShoppingItemForm.propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    listId: PropTypes.number,
    submitForm: PropTypes.func,
    t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(AddShoppingItemForm)
