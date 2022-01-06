import dayjs from "dayjs";


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

export const unixToDateHuman = (date) => {

    if (isToday(date)) {
        // return 'today'
        return 'сегодня'
    } else if (isTomorrow(date)) {
        // return 'tomorrow'
        return 'завтра'
    } else {
        return unixToDate(date)
    }
}

export const nextWeek = () => {
    return dayjs(new Date()).add(1, 'week').day(1).toDate()
}

export const nextMonth = () => {
    return dayjs(new Date()).add(1, 'month').date(1).toDate()
}

export const tomorrow = () => {
    return dayjs(new Date()).add(1, 'day').toDate()
}

export const isToday = (someDate) => {
    return dayjs(someDate).isSame(dayjs(new Date()), 'day')
}

export const isTomorrow = (someDate) => {
    return dayjs(someDate).isSame(dayjs(new Date()).add(1, 'day'), 'day')
}

export const isOverdue = (someDate) => {
    return dayjs(someDate).isBefore(dayjs(new Date()), 'day')
}