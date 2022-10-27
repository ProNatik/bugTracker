//Token
export function getTokenStorage() {
    return window.localStorage.getItem('token');
}

export function setTokenStorage(data){
    localStorage.setItem('token', data);
}

//Id
export function getIdStorage(){
    return window.localStorage.getItem('id');
}

export function setIdStorage(data){
    localStorage.setItem('id', data);
}

//Vider
export function clearStorage(key){
    window.localStorage.removeItem(key);
}