import {useState} from 'react';
import axios from '../utils/axios';
type CreateCoordInput = {
  gps: {lat: number; lng: number};
  adress: {country: string; city: string; district: string; street: string};
  tags: string[];
  socials: [{url: string; plateform: string}];
  photos: [{url: string}];
};

export const useCreateCoordinates = () => {
  // const [user, setUser] = useState(null);
  // const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const createCoordinates = async (inputs: CreateCoordInput) => {
    setLoading(true);
    let c: any;
    let errors: any[];
    try {
      const res = await axios.post('/coordinates', {
        // withCredentials: true,
        body: {inputs},
      });
      setLoading(false);
      const data = res.data;
      if (data.errors.length) {
        errors = data.errors;
      } else {
        c = data.coordinates;
      }
    } catch (err) {
      setLoading(false);
      console.log('Error: ');
      console.log(err);
    }

    return {coordinates: c, errors: errors};
  };

  return {createCoordinates: createCoordinates, loading: loading};
};
