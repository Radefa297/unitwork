//补位 num需要补位的数组 n补几位

export function padnum(num, n) {
    let len = num.toString().length;
    while (len < n) {
        num = '0' + num;
        len++
    }
    return num
}

//向下取整
export function format(interval) {
    return interval | 0;
}

//打乱数组
export function shuffle(array) {
    let _array = array.slice();
    const m = _array.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        const t = _array[m];
        _array[m] = _array[i];
        _array[i] = t;
    }
    return _array;
}

export function resetCurrentIndex(list, song) {
    if (list.length <= 0) return -1;
    return list.findIndex((item) => {
        return item.id === song.id
    })
}

/*反序列化*/
export function deserialize(value) {
    if (typeof value !== "string") {
        return undefined;
    }
    try {
        return JSON.parse(value);
    } catch (e) {
        return value || undefined;
    }
}

/*判断是否可以使用localStorage*/
export function isLocalStorage() {
    return !!window.localStorage;
}

/*获取某个localStorage*/
export function getStore(key, value) {
    if (this.isLocalStorage) {
        if (!key) {
            throw new Error('getStore参数不存在');
        }
        const localStorageVal = this.deserialize(window.localStorage.getItem(key));
        if (localStorageVal) return localStorageVal;
        if (value) {
            this.setStore(key, value);
            return value;
        }
    } else {
        console.log('浏览器不支持localStorage(getStore)');
    }
}

/*设置某个localStorage*/
export function setStore(key, value) {
    if (this.isLocalStorage) {
        if (key && !this.isJSON(key)) {
            window.localStorage.setItem(key, this.stringify(value));
        } else if (key && this.isJSON(key) && !value) {
            for (let a in key) this.setStore(a, key[a]);
        }
    } else {
        console.log('浏览器不支持localStorage(setStore)');
    }
}

/*删除某个localStorage*/
export function delStore(key) {
    if (this.isLocalStorage) {
        if (!key) {
            throw new Error('delStore参数不存在');
        }
        window.localStorage.removeItem(key);
    } else {
        console.log('浏览器不支持localStorage(getStore)');
    }
}

/*yy-mm-dd*/
export function formatDate(date){
    let newData;
    if(date){
        newData = new Date(date);
    }else{
        newData = new Date();
    }
    let year = newData.getFullYear();
    let month = newData.getMonth() + 1;
    let dd = newData.getDate();
    return year + "-" + month + "-" + dd;
}

/*[yy-mm-dd hh-mm-ss]*/
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
}
export function formatTime(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

