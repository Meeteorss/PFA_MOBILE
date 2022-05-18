import {useState} from 'react';
import axios from '../utils/axios';

export const useUpdateCoordinates = () => {
  // const [user, setUser] = useState(null);
  // const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const updateCoordinates = async (id, inputs) => {
    setLoading(true);
    let c: any;
    let errors: any[];
    try {
      const res = await axios.put(`/coordinates/${id}`, {
        // withCredentials: true,
        body: {inputs},
      });
      setLoading(false);
      const data = res.data;

      if (data.errors?.length) {
        return {coordinates: null, errors: data.data.errors};
      } else {
        return {coordinates: data.coordinates, errors: null};
      }
    } catch (err) {
      setLoading(false);
      console.log('Error: ');
      console.log(err);
    }
  };

  return {updateCoordinates: updateCoordinates, loading: loading};
};
