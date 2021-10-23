import { Bounce } from 'react-native-animated-spinkit'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import React from 'react'

const StatusIndicator = ({ isActive, isSuccess, style }) => {
	let activeJsx = []

	if (isActive) {
		activeJsx = (
			<Bounce size={30} color={'purple'} animating={isActive}/>
		)
	}

	let successJsx = []

	if (isSuccess) {
		successJsx = (
			<View style={styles.success_icon_container}>
				<Icon name={'check'} size={20} style={styles.success_icon}/>
			</View>
		)
	}

	return (
		<View style={[styles.container, style]}>
			{activeJsx}
			{successJsx}
		</View>
	)
}

const styles = {
	container: {
		width: 30,
		height: 30,
		flex: 0
	},
	success_icon_container: {
		height: 30,
		lineHeight: 30,
		width: 30,
		backgroundColor: '#a1be9b',
		borderRadius: 15
	},
	success_icon: {
		color: 'green',
		textAlign: 'center',
		height: 30,
		lineHeight: 30,
		width: 30
	}
}

StatusIndicator.propTypes = {
	isActive: PropTypes.bool,
	isSuccess: PropTypes.bool,
	style: PropTypes.object
}

export default StatusIndicator
