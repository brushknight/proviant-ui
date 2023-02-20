import { Provider } from 'react-redux'
import App from './native/containers/App'
import React from 'react'
import store from './common/redux/store'

export default function AppWrapper () {
  return (
      <Provider store={store}>
        <App/>
      </Provider>
  )
}
