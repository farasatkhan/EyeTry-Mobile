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

