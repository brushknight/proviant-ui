import * as React from 'react'
import { Classes, Menu, MenuItem } from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'

const MenuAddProduct = () => {
  const history = useHistory()

  return (
        <Menu
            className={`${
                Classes.ELEVATION_0
            } page-header__navigation-list`}
        >
            <MenuItem icon="plus" text="Add product" onClick={() => {
              history.push('/product/new')
            }}/>
        </Menu>
  )
}

export default MenuAddProduct
