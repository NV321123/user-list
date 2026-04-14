import axios from 'axios';
import type { IUser } from '../model/types';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.api-ninjas.com/v1/randomuser';

interface RawApiUser {
  name: string;
  username: string;
  email: string;
  address: string;
  sex: string;
  birthday: string;
}

export const userApi = {
  fetchRandomUser: async (): Promise<IUser> => {
    if (!API_KEY) {
      throw new Error('API Key is missing. Please check .env file.');
    }
    
    const response = await axios.get<RawApiUser>(BASE_URL, {
      headers: { 'X-Api-Key': API_KEY },
    });

    const data = response.data;
    
    return {
      id: crypto.randomUUID(),
      username: data.username || 'Unknown',
      name: data.name || 'Unknown',
      email: data.email || 'Unknown',
      address: data.address || 'Unknown',
      sex: data.sex || 'Unknown',
      birthday: data.birthday || 'Unknown',
    };
  },
};