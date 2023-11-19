import { authenticatedAxiosInstance } from "../../api/config";

export const viewAllGlasses = async () => {
    try {
        const response = await authenticatedAxiosInstance.get('/products/v1/glasses');
        return response.data;
    } catch (error) {
        console.error('Error while retriving glasses', error);
        throw error;
    }
}

export const viewAllEyeGlassesList = async () => {
    try {
        const response = await authenticatedAxiosInstance.get('/products/v1/glasses/eyeglasses');
        return response.data;
    } catch (error) {
        console.error('Error while retriving glasses', error);
        throw error;
    }
}

export const viewAllSunGlassesList = async () => {
    try {
        const response = await authenticatedAxiosInstance.get('/products/v1/glasses/sunglasses');
        return response.data;
    } catch (error) {
        console.error('Error while retriving glasses', error);
        throw error;
    }
}

export const viewSingleProduct = async (productId) => {
    try {
        const response = await authenticatedAxiosInstance.get('/products/v1/glasses/' + productId);
        return response.data;
    } catch (error) {
        console.error('Error while retriving glasses', error);
        throw error;
    }
}