import axios from 'axios';
import { clearLocalStorageData, getLocalStorageData } from '../shared/commonFunction';
import { showToast } from '../shared/sharedComponents/ToasterMessage/ToasterMessage';


export const postApiRequest = async (endPoint, data) => {
    const token = getLocalStorageData('token')
    const BASE_URL = import.meta.env.VITE_API_URL;
    try {
        const response = await axios.post(`${BASE_URL}/${endPoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response?.data;
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
}