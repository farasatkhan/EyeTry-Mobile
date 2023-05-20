import axios from 'axios';
import { getDataAsyncStorage} from '../utils/asyncStorage';

const baseURL = 'http://localhost:3000'


// Getting user data 
export const getUserData = async () => {
    try {
        const accessToken =await getDataAsyncStorage("accessToken")
        const response = await axios.get(`${baseURL}/users/profile`, {
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
        });
        console.log(response.data)
        return response.data;
    } 
    catch (error) {
      throw error;
    }
  };

// Updating User Data

// Change Password
export const changePassword = async (currentPassword,newPassword,confirmPassword) => {

    const data= {
            "currentPassword": currentPassword,
            "newPassword": newPassword,
            "confirmPassword": confirmPassword
    }
    try {
        const accessToken =await getDataAsyncStorage("accessToken")
        const response = await axios.post(`${baseURL}/users/change_password`,data, {
        headers:{
            Authorization:`Bearer ${accessToken}`
        },
        });
        console.log(response)
        return response;
    } 
    catch (error) {
      throw error;
    }
  };

  
