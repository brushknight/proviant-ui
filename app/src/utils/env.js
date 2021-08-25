export const isSaaS = () => {
    return Number(process.env.is_saas) === 1
}

export const version = () => {
    return process.env.version
}
