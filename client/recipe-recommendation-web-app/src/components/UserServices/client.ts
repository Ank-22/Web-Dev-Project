import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/users`;

export interface User { id: string; username: string; email: string; role: string; password: string;
    first_name: string; last_name: string; country: string; age: number; groups: [object] };

const api = axios.create({
    withCredentials: true
});

export const createUser = async (user: any) => {
    const response = await api.post(`${USERS_API}/signUp`, user);
    return response.data;
};

export const signIn = async (credentials: any) => {
    const response = await api.post( `${USERS_API}/signIn`, credentials );
    return response.data;
};

export const profile = async () => {
    const response = await api.post(`${USERS_API}/profile`);
    return response.data;
};

export const updateUser = async (user: any) => {
    const response = await api.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

export const signout = async () => {
    const response = await api.post(`${USERS_API}/signout`);
    return response.data;
};

export const findUserById = async (id: string) => {
    const response = await api.get(`${USERS_API}/${id}`);
    return response.data;
};

export const deleteUser = async (user: any) => {
    const response = await api.delete(
        `${USERS_API}/${user._id}`);
    return response.data;
};

export const findAllUsers = async () => {
    const response = await api.get(`${USERS_API}`);
    return response.data;
};

export const findUsersByRole = async (role: string) => {
    const response = await
        api.get(`${USERS_API}?role=${role}`);
    return response.data;
};

export const findUsersByUsername = async (username: string) => {
    const response = await
        api.get(`${USERS_API}/findUserByUsername/${username}`);
    return response.data;
};
