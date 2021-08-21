import * as React from 'react'
import {withTranslation} from 'react-i18next'
import PropTypes from 'prop-types'

const ShoppingListRow = ({item, i18n}) => {

    let tickClassModification = ''
    let rowClassModification = ''
    if (item.checked) {
        tickClassModification = 'shopping-list-item__tick--checked'
        rowClassModification = 'shopping-list-item--checked'
    }

    return (
        <div className={'shopping-list-item ' + rowClassModification}>
            <div className={'shopping-list-item__title'}>{item.title}</div>
            <div className={'shopping-list-item__quantity'}>{item.quantity}</div>
            <div className={'shopping-list-item__tick ' + tickClassModification}></div>
        </div>
    )
}

ShoppingListRow.propTypes = {
	item: PropTypes.object,
    i18n: PropTypes.object
}

export default withTranslation('translations')(ShoppingListRow)
