import {useState} from 'react';
import axios from '../utils/axios';

export const useGetSignedUrl = () => {
  const [loading, setLoading] = useState(false);

  const getSignedUrl = async ({input}) => {
    setLoading(true);
    try {
      const res = await axios.post('/upload/signedUrl', {body: input});
      setLoading(false);
      // console.log('Res : ', res.data);
      return {signedUrl: res.data.signedUrl};
    } catch (err) {
      console.log('Upload error : ', err);
      return {error: err.message};
    }
  };
  return {getSignedUrl, loading};
};

export const useUploadImg = () => {
  const [loading, setLoading] = useState(false);

  const uploadImg = async ({input}) => {
    setLoading(true);
    try {
      const res = await axios.post('/upload/coordinates', {body: input});
      setLoading(false);
      console.log('Res : ');
    } catch (err) {
      console.log('Upload error : ', err);
    }
  };
  return {uploadImg, loading};
};
