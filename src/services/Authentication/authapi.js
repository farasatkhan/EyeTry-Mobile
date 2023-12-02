import axios from 'axios';
import { getDataAsyncStorage, remvoveItemAsyncStorage } from '../../utils/AsynchronusStorage/asyncStorage';
import { storeDataAsyncStorage } from '../../utils/AsynchronusStorage/asyncStorage';
import API_URL from '../../config/config';


// Re Generating Access Token
export const reGenerateAccessToken = async () => {
  try {
    const refreshToken = await getDataAsyncStorage("refreshToken")
    const response = await axios.post(`${API_URL}/auth/token`, {
      token: refreshToken,
    });

    const newAccessToken = response.data.accessToken
    await storeDataAsyncStorage('accessToken', newAccessToken)
    console.log('New Access Token', response.data)
    return response.data.accessToken

  }
  catch (error) {
    throw error
  }
};


export const registerUser = async (firstName, lastName, email, password, confirmPassword) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      confirmpassword: confirmPassword,
    });
    return response;
  }
  catch (error) {
    throw error;
  }
};


export const signInUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: email,
      password: password
    });
    console.log(response)
    return response;

  }
  catch (error) {
    throw error
  }
}

export const logoutUser = async () => {
  try {
    const refreshToken = await getDataAsyncStorage("refreshToken")
    const response = await axios.delete(`${API_URL}/auth/logout`, {
      token: refreshToken
    });
    remvoveItemAsyncStorage("refreshToken")
    remvoveItemAsyncStorage("accessToken")
    console.log("Logging out", response)
    return response;
  }
  catch (error) {
    throw error
  }
}

