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