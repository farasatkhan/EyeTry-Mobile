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


// Getting user data 
export const getUserData = async () => {
    try {
        const accessToken = await getDataAsyncStorage("accessToken")
        const response = await axios.get('/users/profile', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return getUserData()
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error
    }
};


// Delete Address
export const deleteAddress = async (id) => {
    const addressId = id
    try {
        const accessToken = await getDataAsyncStorage("accessToken")
        const response = await axios.delete(`/users/delete_address/${addressId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        console.log("Delete Address Response :", response)
        return response;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Access Token Expired Trying to refresh it")
                await reGenerateAccessToken()
                return deleteAddress(addressId)
            }
            catch (e) {
                console.log("Refresh Error")
                if (e.response && e.response.status == 403) {
                    console.log("Refresh Token is also expired logging out the user")
                    return e.response.status
                }
                throw e
            }
        }
        throw error;
    }
};

export const checkout = async (orderData) => {
    const data = orderData
    try {
        const accessToken = await getDataAsyncStorage("accessToken")
        const response = await axios.post('products/v1/order/checkout', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        console.log("Response :", response)
        return response;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return checkout(data)
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};

// get stripe key
export const getStripeApiKey = async () => {
    try {
        const accessToken = await getDataAsyncStorage("accessToken")
        const response = await axios.get('payment/stripe_api_key', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        console.log("Response :", response.data)
        return response;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return getStripeApiKey()
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};
// 
export const processPayment = async () => {
    try {
        const accessToken = await getDataAsyncStorage("accessToken")
        const response = await axios.post('payment/process_payment', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        console.log("Response :", response.data)
        return response;
    }
    catch (error) {
        // Server is returning 403 for expired token
        if (error.response && error.response.status == 403) {
            try {
                console.log("Error Catched")
                await reGenerateAccessToken()
                return processPayment()
            }
            catch (e) {
                console.error("Error while refreshing token", e)
                throw e
            }
        }
        throw error;
    }
};
