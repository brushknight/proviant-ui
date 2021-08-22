import * as React from 'react'
import {useEffect, useState} from 'react'
import {Overlay} from '@blueprintjs/core'
import {useHistory, useParams} from 'react-router-dom'
import {withTranslation} from 'react-i18next'
import OverlayCloseButton from '../generic/OverlayCloseButton'
import PropTypes from 'prop-types'
import ShoppingListItem from "./ShoppingListItem";

const ShoppingListItemOverlay = ({filterType}) => {
    const {id, itemId} = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const history = useHistory()

    useEffect(() => {
        setIsOpen(true)
    }, [])

    const onClose = () => {
        history.push('/shopping/' + id)
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
                <ShoppingListItem
                    itemId={Number(itemId)}
                    listId={id}
                    className={'product-overlay__inner product-overlay__inner--fixed'}
                    closePopover={closePopover}
                />
            </div>

        </Overlay>
    )
}

ShoppingListItemOverlay.propTypes = {
    filterType: PropTypes.string
}

export default withTranslation('translations')(ShoppingListItemOverlay)
