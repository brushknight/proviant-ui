export const unixToDate = (date) => {
	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()

	return `${day}/${month}/${year}`
}

export const unixToDateTime = (date) => {
	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()

	let hour = date.getHours()
	if (hour < 10) {
		hour = '0' + hour
	}

	let minute = date.getMinutes()
	if (minute < 10) {
		minute = '0' + minute
	}

	return `${day}/${month}/${year} ${hour}:${minute}`
}
