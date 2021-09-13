import './style/main.less'
import { I18nextProvider } from 'react-i18next'
import { render } from 'react-dom'
import App from './components/App'
import i18n from './i18n'
import React from 'react'

render(<I18nextProvider i18n={i18n}><App/></I18nextProvider>, document.getElementById('root'))
