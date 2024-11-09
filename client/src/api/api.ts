import axios from 'axios';
import API from ".";
import { ILoginValues, ISignUpValues } from "../utils/types";

export const setAuthToken = (token: string | null) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export async function login(values:ILoginValues) {
    const response = await API.post("login", values);
    return response.data;
}

export async function singup(values: ISignUpValues) {
    const response = await API.post("signup", values);
    return response.data;
}

export async function fetchUserProfile() {
    const response = await API.get('/me');
    return response.data;
}

export async function updateProfile(formData: FormData){
  const response = await API.put('/me', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export async function uploadAvatar(formData: FormData) {
    try {
        const response = await API.put('/me', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
    } catch (error) {
        console.error("Upload failed", error);
    }
}

export async function deleteAccount() {
    const response = await API.delete('/me');
    return response.data;
}