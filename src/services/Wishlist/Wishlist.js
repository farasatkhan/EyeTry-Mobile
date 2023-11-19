import { authenticatedAxiosInstance } from "../../api/config";

export const createWishlistProduct = async (productId) => {
    try {
        const response = await authenticatedAxiosInstance.post('/users/add_favorite', {productId: productId});
        return response.data;
    } catch (error) {
        console.error('Error while adding to favorites from wishlist', error);
        throw error;
    }
}

export const viewAllWishlistsProducts = async () => {
    try {
        const response = await authenticatedAxiosInstance.get('/users/view_favorite');
        return response.data;
    } catch (error) {
        console.error('Error while viewing favorites from wishlist', error);
        throw error;
    }
}

export const removeWishlistProduct = async (productId) => {
    try {
        const response = await authenticatedAxiosInstance.delete('/users/delete_favorite/'+productId);
        return response.data;
    } catch (error) {
        console.error('Error while removing favorites from wishlist', error);
        throw error;
    }
}