import axios from "axios";
import { END_POINTS } from "../Helper/Constant";

const BASE_URL = import.meta.env.VITE_API_URL;

const login = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/${END_POINTS.LOGIN}`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/${END_POINTS.FORGOT_PASSWORD}`, {
            email
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export { login, forgotPassword };