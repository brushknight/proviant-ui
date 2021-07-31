export const isSaaS = () => {
	return process.env.is_saas === 1
}

export const version = () => {
	return process.env.version
}
