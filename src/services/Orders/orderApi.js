import axios from "../../utils/AxiosConfig/axiosConfig";
import { getDataAsyncStorage } from '../../utils/AsynchronusStorage/asyncStorage';
import { storeDataAsyncStorage } from '../../utils/AsynchronusStorage/asyncStorage';
import { reGenerateAccessToken } from '../Authentication/authapi';

// View Products List
export const viewProductsList = async () => {
    try {
        const accessToken = await getDataAsyncStorage("accessToken")
        const response = await axios.get('/products/v1/glasses', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log("Response ", response?.data || "Not Modified 304 ")
        return response?.data;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return viewProfileImage()
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};

// View Specific product
export const viewParticularProduct = async (glassesId) => {
    try {
        const accessToken = await getDataAsyncStorage("accessToken")
        const response = await axios.get(`/products/v1/glasses/${glassesId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log("Response ", response?.data || "Not Modified 304 ")
        return response?.data;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return viewProfileImage()
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};
