import { toastMessage } from "@/provider/toastProvider";
import axios from "axios";
import { h } from "vue";
import { resetUser } from "./localStorageHandler";
import { isTokenExpired } from "./tokenHandler";


export const registerUser = async (values: { username: string, score: { points: number } }) => {
    const response = await axios.post('https://localhost:7299/api/authentication', values);
    return response.data;
};

export const loginUser = async (values: { username: string }) => {
    const response = await axios.post('https://localhost:7299/api/authentication/login', values);
    return response.data;
};

export const logOutUser = async () => {
    const userObj = getUserObjectFromLocalStorage();
    if (!userObj) return;

    const token = {
        accessToken: userObj.accessToken,
        refreshToken: userObj.refreshToken,
    };

    if (typeof token.accessToken === 'string' && isTokenExpired(token.accessToken)) {
        resetUser();
    }

    try {
        await axios.post('https://localhost:7299/api/authentication/logout', token);
        resetUser();
    } catch (error) {
        // Handle logout error
    }
};

const getUserObjectFromLocalStorage = () => {
    const storedUserObj = localStorage.getItem('UserObject');
    if (!storedUserObj) return null;

    try {
        return JSON.parse(storedUserObj);
    } catch (error) {
        console.error('Error parsing user object from local storage:', error);
        return null;
    }
}