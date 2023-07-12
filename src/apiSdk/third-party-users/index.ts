import axios from 'axios';
import queryString from 'query-string';
import { ThirdPartyUserInterface, ThirdPartyUserGetQueryInterface } from 'interfaces/third-party-user';
import { GetQueryInterface } from '../../interfaces';

export const getThirdPartyUsers = async (query?: ThirdPartyUserGetQueryInterface) => {
  const response = await axios.get(`/api/third-party-users${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createThirdPartyUser = async (thirdPartyUser: ThirdPartyUserInterface) => {
  const response = await axios.post('/api/third-party-users', thirdPartyUser);
  return response.data;
};

export const updateThirdPartyUserById = async (id: string, thirdPartyUser: ThirdPartyUserInterface) => {
  const response = await axios.put(`/api/third-party-users/${id}`, thirdPartyUser);
  return response.data;
};

export const getThirdPartyUserById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/third-party-users/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteThirdPartyUserById = async (id: string) => {
  const response = await axios.delete(`/api/third-party-users/${id}`);
  return response.data;
};
