export const getLocalStorageData = (key) => {
    return localStorage.getItem(key)
}

export const setLocalStorageData = (key, value) => {
    localStorage.setItem(key, value)
}

export const clearLocalStorageData = () => {
    localStorage.setItem()
}