import * as React from 'react'
import {useEffect} from 'react'
import {Callout, Intent, Spinner} from '@blueprintjs/core'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {STATUS_FETCH_FAILED, STATUS_LOADING} from '../../redux/reducers/consts'
import {useParams} from 'react-router-dom'
import {withTranslation} from 'react-i18next'
import PropTypes from 'prop-types'
import {GA_PAGE_SHOPPING_LIST, pageView} from "../../utils/ga";
import {getShoppingList} from "../../redux/selectors";
import {shoppingListFetchItems} from "../../redux/actions/shopping/list";
import ShoppingListRow from "./ShoppingListRow";
import ShoppingForm from "./ShoppingForm";
import {shoppingListItemCheck, shoppingListItemUncheck} from "../../redux/actions/shopping/tick";

const ShoppingList = ({status, error, model, items, t, fetchItems, checkItem, uncheckItem}) => {

    const {id} = useParams()

    useEffect(() => {
        fetchItems(id)
    }, [id])

    if (status === STATUS_LOADING) {
        return (
            <section className={'shopping-list'}>
                <Spinner/>
            </section>
        )
    }

    if (status === STATUS_FETCH_FAILED) {
        return (
            <section className={'shopping-list'}>
                <Callout title={t('global.ooops')} intent={Intent.DANGER}>
                    {error}
                </Callout>
            </section>
        )
    }

    if (items.length === 0) {
        return (
            <section className={'shopping-list'}>
                <div>no items yet</div>
            </section>
        )
    }

    pageView(GA_PAGE_SHOPPING_LIST)

    return (
        <section className={'shopping-list'}>
            <ShoppingForm
                listId={Number(id)}
            />
            {items.map(item => (
                <ShoppingListRow
                    item={item}
                    onCheck={() => {
                        checkItem(id, item.id)
                    }}
                    onUncheck={() => {
                        uncheckItem(id, item.id)
                    }}
                />
            ))}
        </section>
    )
}

const mapStateToProps = (state, ownProps) => {
    const shoppingList = getShoppingList(state)

    const t = ownProps.i18n.t.bind(ownProps.i18n)
    return {
        model: shoppingList.model,
        items: shoppingList.model.items,
        status: shoppingList.status,
        error: shoppingList.error,
        t
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const locale = ownProps.i18n.language
    return {
        fetchItems: (query) => dispatch(shoppingListFetchItems(query, locale)),
        checkItem: (listId, id) => dispatch(shoppingListItemCheck(listId, id, locale)),
        uncheckItem: (listId, id) => dispatch(shoppingListItemUncheck(listId, id, locale))
    }
}

ShoppingList.propTypes = {
    model: PropTypes.object,
    fetchItems: PropTypes.func,
    checkItem: PropTypes.func,
    uncheckItem: PropTypes.func,
    t: PropTypes.func
}

export default compose(withTranslation('translations'), connect(mapStateToProps, mapDispatchToProps))(ShoppingList)
