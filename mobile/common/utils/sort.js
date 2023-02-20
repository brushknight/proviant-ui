export const sortListByUpdateDate = (a, b) => {
    // if a less then b
    if (!a.checked && b.checked) {
        return -1
    }
    // if a more then b
    if (a.checked && !b.checked) {
        return 1
    }
    // if a equal then b
    return b.updated_at - a.updated_at
}

export const sortListByDueDate = (a, b) => {
    // if a less then b
    if (!a.checked && b.checked) {
        return -1
    }
    // if a more then b
    if (a.checked && !b.checked) {
        return 1
    }
    // if a equal then b
    return a.due_date - b.due_date
}