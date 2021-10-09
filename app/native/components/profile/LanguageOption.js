import { Image, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'

const LanguageOption = ({ language }) => {
	const filePathEn = '../../assets/flags/en.png'
	const filePathRu = '../../assets/flags/ru.png'

	let filePath

	switch (language) {
	case 'en':
		filePath = filePathEn
		break
	case 'ru':
		filePath = filePathEn
		break
	}

	return (
		<TouchableOpacity style={styles.local_picker}>
			<Image style={styles.flag} source={require('../../assets/flags/en.png')}/>
			<Text style={styles.local_picker_text}>{language}</Text>
		</TouchableOpacity>
	)
}

LanguageOption.propTypes = {
	language: PropTypes.string
}

const styles = {
	local_picker: {
		flex: 1,
		flexDirection: 'row'
		// opacity: 0.5
	},
	local_picker_selected: {
		// backgroundColor: 'grey',
		// opacity: 1
	},
	local_picker_text: {
		paddingLeft: 10,
		height: 30,
		lineHeight: 30
	},
	flag: {
		width: 50,
		height: 30,
		backgroundColor: 'red',
		resizeMode: 'cover'
	}
}

export default LanguageOption
