import * as React from 'react'
import {useEffect, useState} from 'react'
import {withTranslation} from 'react-i18next'
import PropTypes from 'prop-types'
import {getShoppingList, getShoppingListEdit, getShoppingListItem} from "../../redux/selectors";
import {shoppingListItemCheck, shoppingListItemUncheck} from "../../redux/actions/shopping/tick";
import {compose} from "redux";
import {connect} from "react-redux";
import {STATUS_DEFAULT, STATUS_EDITING, STATUS_ERROR, STATUS_LOADED, STATUS_UPDATED} from "../../redux/reducers/consts";
import {Button, InputGroup, Intent, NumericInput} from "@blueprintjs/core";
import {shoppingListItemReset, shoppingListItemUpdate} from "../../redux/actions/shopping/edit";

const ShoppingListItem = ({listId, id, item, fetchStatus, status, fetchError, error, t, className, updateItem, reset, closePopover}) => {

    const [title, setTitle] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [statusInternal, setStatusInternal] = useState('')

    const emptyForm = () => {
        setTitle('')
        setQuantity(1)
        setStatusInternal(STATUS_DEFAULT)
    }

    useEffect(() => {

        if (fetchStatus === STATUS_LOADED || fetchStatus === STATUS_DEFAULT) {
            setTitle(item.title)
            setQuantity(item.quantity)
        }

        setStatusInternal(status)

        if (status === STATUS_UPDATED){
            emptyForm()
            reset()
            closePopover()
        }

    }, [
        fetchStatus, status
    ])



    const onSubmit = (e) => {
        e.preventDefault()

        updateItem(listId, id, {
            title,
            quantity
        })
    }

    return (
        <div className={className}>
            <form onSubmit={onSubmit}>
                <InputGroup
                    autoFocus={true}
                    placeholder={t('shopping_list_item.title')}
                    leftIcon={'tag'}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        setStatusInternal(STATUS_EDITING)
                    }}
                />
                <NumericInput
                    min={1}
                    value={quantity}
                    onValueChange={value => setQuantity(value)}
                />
                <div>
                    <Button
                        disabled={statusInternal === STATUS_ERROR}
                        icon={'tick'}
                        large={true}
                        minimal={true}
                        intent={Intent.SUCCESS}
                        type={'submit'}
                    >{t('shopping_list_item.button_save')}</Button>
                    <Button
                        disabled={statusInternal === STATUS_ERROR}
                        icon={'remove'}
                        large={true}
                        minimal={true}
                        intent={Intent.DANGER}
                        type={'button'}
                    >{t('shopping_list_item.button_delete')}</Button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const shoppingList = getShoppingList(state)
    const shoppingListEdit = getShoppingListEdit(state)
    const shoppingListItem = getShoppingListItem(state, ownProps.itemId)

    const t = ownProps.i18n.t.bind(ownProps.i18n)
    return {
        model: shoppingList.model,
        item: shoppingListItem,
        fetchStatus: shoppingList.status,
        fetchError: shoppingList.error,
        status: shoppingListEdit.status,
        error: shoppingListEdit.error,
        id: ownProps.itemId,
        listId: ownProps.listId,
        t
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const locale = ownProps.i18n.language
    return {
        checkItem: (listId, id) => dispatch(shoppingListItemCheck(listId, id, locale)),
        uncheckItem: (listId, id) => dispatch(shoppingListItemUncheck(listId, id, locale)),
        updateItem: (listId, id, dto) => dispatch(shoppingListItemUpdate(listId, id, dto, locale)),
        reset: () => dispatch(shoppingListItemReset())
    }
}

ShoppingListItem.propTypes = {
    item: PropTypes.object,
    itemId: PropTypes.number,
    updateItem: PropTypes.func,
    reset: PropTypes.func,
    closePopover: PropTypes.func,
    className: PropTypes.string,
    i18n: PropTypes.object
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ShoppingListItem)
