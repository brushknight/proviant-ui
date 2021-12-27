const TARGET_WEB = 'web'

export const ENV_DEV = 'dev'
export const ENV_PROD = 'prod'

export const isSaaS = () => {
    return Number(process.env.is_saas) === 1 || !isWeb() // TODO make is SaaS tick in app settings
}

export const version = () => {
    return process.env.version
}

export const getApiUrl = () => {
    return process.env.api_url
}

export const isWeb = () => {
    return process.env.target === TARGET_WEB
}

export const getEnv = () => {
    return ENV_DEV
    //return ENV_PROD
}

export const isProd = () => {
    return getEnv() === ENV_PROD
}

export const isExpo = () => {
    //return false
    return true
}
