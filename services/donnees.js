import instance from './instance.js';

export async function login(pseudo, password) {
    const { data } = await instance.get(`/login/${pseudo}/${password}`);
    return data;
}
export async function signup(pseudo, password) {
    const { data } = await instance.get(`/signup/${pseudo}/${password}`);
    return data;
}

export async function listBug(token) {
    const { data } = await instance.get(`/list/${token}/0`);
    return data;
}

export async function listBugUser(token, id) {
    const { data } = await instance.get(`/list/${token}/${id}`);
    return data;
}

export async function listUsers(token) {
    const { data } = await instance.get(`/users/${token}`);
    return data;
}

export async function updateBug(token, bug_id, newState) {
    const { data } = await instance.get(`/state/${token}/${bug_id}/${newState}`);
    return data;
}

export async function deleteBug(token, bug_id) {
    const { data } = await instance.get(`/delete/${token}/${bug_id}`);
    return data;
}

export async function addBug(token, user_id, title, description) {
    const { data } = await instance.post(
        `/add/${token}/${user_id}`,
        {
            title,
            description,
        },
        {
            headers: {
              "Content-Type": "text/plain",
            },
        }
    )
    return data;
}