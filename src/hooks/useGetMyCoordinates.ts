import {useEffect, useState} from 'react';
import {useAuthContext} from '../context/AuthContext';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.100.3:4000/',
  headers: {'content-type': 'application/json'},
  withCredentials: true,
});

export const useGetMyCoordinates = () => {
  const {isAuth, user, loading: loadingCtx} = useAuthContext();
  const [coordinates, setcoordinates] = useState();
  const [loading, setLoading] = useState(false);

  const getCoordinates = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/coordinates/user/${user.id}`, {
        withCredentials: true,
      });
      setLoading(false);
      //   console.log("res ,", res);
      const {data} = res;
      const coordinates = data.data;
      setcoordinates(coordinates);
    } catch (err) {
      setLoading(false);
      console.log(err);
      return {coordinates: [], error: err};
    }
  };

  useEffect(() => {
    setLoading(true);

    if (user) {
      axiosInstance
        .get(`/coordinates/user/${user.id}`, {
          withCredentials: true,
        })
        .then(response => {
          setLoading(false);
          const {data} = response;
          const coordinates = data.data;

          setcoordinates(coordinates);
        })
        .catch(err => {
          console.log('Error:');
          console.log(err);
          setLoading(false);
        });
    }
  }, [loadingCtx, user]);

  const refetch = () => {
    axiosInstance
      .get(`/coordinates/user/${user.id}`, {
        withCredentials: true,
      })
      .then(response => {
        setLoading(false);
        const {data} = response;
        const coordinates = data.data;

        setcoordinates(coordinates);
      })
      .catch(err => {
        console.log('Error:');
        console.log(err);
        setLoading(false);
      });
  };

  return {
    getCoordinates: getCoordinates,
    coordinates: coordinates,
    setcoordinates: setcoordinates,
    loading: loading,
    refetch: refetch,
  };
};
