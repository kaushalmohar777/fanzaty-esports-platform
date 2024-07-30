import axios from "axios";
import { clearLocalStorageData, getLocalStorageData } from "../shared/commonFunction";
import { showToast } from "../shared/sharedComponents/ToasterMessage/ToasterMessage";

export const getApiRequest = async (END_POINTS) => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const token = getLocalStorageData("token");
    try {
        const response = await axios.get(`${BASE_URL}/${END_POINTS}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error?.response?.status === 401) {
            showToast(error.response.data.message);
            clearLocalStorageData();
            window.location.href = "/login";
        } else if (error?.response?.status === 400) {
            showToast(error.response.data.message);
        }
        throw error;
    }
};