import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import languageEN from './locate/en/translate.json'
import languageRU from './locate/ru/translate.json'
// import XHR from 'i18next-xhr-backend'

const langDetectorOptions = {
	order: ['cookie'],
	lookupCookie: 'user-locale'

	// cache user language
	// caches: ['cookie']
	// cookieMinutes: 10,
	// cookieDomain: 'myDomain'
}

i18n
	// .use(XHR)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		detection: langDetectorOptions,
		resources: {
			en: languageEN,
			ru: languageRU
		},
		/* default language when load the website in browser */
		lng: 'en',
		/* When react i18next not finding any language to as default in borwser */
		fallbackLng: 'en',
		/* debugger For Development environment */
		debug: false,
		ns: ['translations'],
		defaultNS: 'translations',
		keySeparator: '.',
		interpolation: {
			escapeValue: false,
			formatSeparator: ','
		},
		react: {
			wait: true,
			bindI18n: 'languageChanged loaded',
			bindStore: 'added removed',
			nsMode: 'default'
		}
	})

export default i18n
