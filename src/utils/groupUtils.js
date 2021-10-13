export const sortGroup = (value, type) => {
    let tempGroup = [...value]
    if (type) {
        tempGroup.sort((a, b) => {
            const nameA = a.name.toUpperCase()
            const nameB = b.name.toUpperCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0
        })
    } else {
        tempGroup.sort((a, b) => {
            const nameA = a.name.toUpperCase()
            const nameB = b.name.toUpperCase()
            if (nameA < nameB) {
                return 1
            }
            if (nameA > nameB) {
                return -1
            }
            return 0
        })
    }

    return tempGroup
}
