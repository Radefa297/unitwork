import store from 'storejs'

//是否store.get为arr
function isArray(value) {
    return typeof store(value) === "string" || typeof store(value) === "undefined"
}

//排序
function insertArray(array, value, compare, maxLen) {
    //compare比较函数 查找compare位置
    const index = array.findIndex(compare);
    //当compare位置在0下标表示数组唯一元素时 不操作
    if (index === 0) return;
    //当compare处于其他位置 删除compare当前位置
    if (index > 0) {
        array.splice(index, 1)
    }
    //并在开头添加keyword
    array.unshift(value);
    //当存储的数据大于限制数据时 删除最后一个元素
    if (maxLen && array.length > maxLen) {
        array.pop()
    }
}

//保存Store
export function saveStore(key, item, compare, maxLen) {
    let localstorage = isArray(key) ? [] : store(key);
    insertArray(localstorage, item, compare, maxLen);
    store.set(key, localstorage);
    return localstorage
}

//读取Store
export function loadStore(key) {
    return isArray(key) ? [] : store(key);
}

//删除Store
export function deleteStore(key, index) {
    let localstorage = isArray(key) ? [] : store(key);
    localstorage.splice(index, 1);
    store.set(key, localstorage);
    return localstorage
}

//清空Store 并return returnKey
export function clearStore(key, returnKey) {
    store.remove(key);
    return returnKey
}