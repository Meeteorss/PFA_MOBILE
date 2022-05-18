import {useEffect, useState} from 'react';
import {useAuthContext} from '../context/AuthContext';
import axios from '../utils/axios';

export const useGetCoordinates = ({id}) => {
  const {isAuth, user, loading: loadingCtx} = useAuthContext();
  const [coordinates, setCoordinates] = useState();
  const [loading, setLoading] = useState(false);

  const getCoordinates = async ({id}) => {
    try {
      setLoading(true);

      const res = await axios.get(`/coordinates/${id}`, {
        withCredentials: true,
      });

      setLoading(false);
      //   console.log("res ,", res);
      const {data} = res;
      const c = data.coordinates;

      setCoordinates(coordinates);
      return {coordinates: c};
    } catch (err) {
      setLoading(false);
      console.log(err);
      return {coordinates: null, error: err};
    }
  };

  useEffect(() => {
    setLoading(true);

    if (!loadingCtx && user) {
      axios
        .get(`/coordinates/${id}`, {
          withCredentials: true,
        })
        .then(response => {
          setLoading(false);
          const {data} = response;
          const coordinates = data.coordinates;

          setCoordinates(coordinates);
        })
        .catch(err => {
          console.log('Error:');
          console.log(err);
          setLoading(false);
        });
    }
  }, [loadingCtx, user]);

  const refetch = () => {
    axios
      .get(`/coordinates/${id}`, {
        withCredentials: true,
      })
      .then(response => {
        setLoading(false);
        const {data} = response;
        const coordinates = data.coordinates;

        setCoordinates(coordinates);
      })
      .catch(err => {
        console.log('Error:');
        console.log(err);
        setLoading(false);
      });
  };

  return {
    getCoordinates,
    coordinates,
    setCoordinates: setCoordinates,
    loading: loading,
    refetch: refetch,
  };
};
