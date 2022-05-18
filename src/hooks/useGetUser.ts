import {useEffect, useState} from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.100.3:4000/',
  headers: {'content-type': 'application/json'},
  withCredentials: true,
});
export const useGetUser = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    try {
      const res = await axiosInstance.get('/auth', {withCredentials: true});

      return {user: res.data.user};
    } catch (err) {
      console.log('Failed');

      console.log(err);
      return {user: null};
    }
  };
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get('/auth', {withCredentials: true})
      .then(response => {
        const data = response.data;

        setUser(data.user);

        setLoading(false);
      })
      .catch(err => {
        console.log('Error:');
        console.log(err);
        setLoading(false);
      });
  }, []);

  return {getUser: getUser, user: user, loading: loading};
};
