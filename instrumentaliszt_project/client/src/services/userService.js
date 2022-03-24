import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
const tokenKey = 'token';

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (error) {
        return null;
    }
}

export async function login(email, password) {
    const { data } = await http.post(`${apiUrl}/auth/user`, { email, password });
    localStorage.setItem(tokenKey, data.token);
}

export async function getCurrentUserDetails(){
    return await http.get(`${apiUrl}/users/me`);

}
export async function updateUser(user){
    await http.put(`${apiUrl}/users/edit`, user);

}

export async function addToCart(itemId){
    await http.put(`${apiUrl}/users/addToCart`, {itemId});

}

export async function removeFromCart(itemId){
    await http.delete(`${apiUrl}/users/removeFromCart`, {params: { itemId}});

}

export async function getMyCart(){
    return await http.get(`${apiUrl}/users/cart`);

}

export async function loginAsAdmin(email, password) {
    const { data } = await http.post(`${apiUrl}/auth/owner`, { email, password });
    localStorage.setItem(tokenKey, data.token);
}






// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
    getCurrentUser,
    logout,
    getJwt,
    getCurrentUserDetails,
    updateUser,
    addToCart,
    removeFromCart,
    getMyCart,
    loginAsAdmin
};