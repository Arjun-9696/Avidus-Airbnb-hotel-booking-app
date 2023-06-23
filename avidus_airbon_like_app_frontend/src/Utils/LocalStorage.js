const getLocalData = (key) => {
    if (key) {
        return localStorage.getItem(key);
    }
};

const saveLocalData = (key, value) => {
    if (key && value) {
        localStorage.setItem(key, value);
    }
};

export { getLocalData, saveLocalData };