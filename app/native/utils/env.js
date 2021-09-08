export const isSaaS = () => {
	return false //Number(process.env.is_saas) === 1
}

export const backendUrl = () => {
	return 'http://10.0.0.117:8080'
}