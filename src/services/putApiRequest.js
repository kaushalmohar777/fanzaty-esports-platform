import axios from 'axios';
import { clearLocalStorageData, getLocalStorageData } from '../shared/commonFunction';


export const putApiRequest = async (endPoint, data) => {
    const token = getLocalStorageData('token')
    const BASE_URL = import.meta.env.VITE_API_URL;
    try {
        const response = await axios.put(`${BASE_URL}/${endPoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            // toast.error(error.response.data.message);
            clearLocalStorageData()
            window.location.href = '/login'
        }
        throw error;
    }
}