import axios from 'axios';
import Config from 'react-native-config';

export const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${Config.API_TOKEN}`,
};

export const apiInstance = axios.create({
  baseURL: Config.API_URL,
  headers: defaultHeaders,
});
