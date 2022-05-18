/* eslint-disable prettier/prettier */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useGetUser} from '../hooks/useGetUser';
import {useLogin} from '../hooks/useLogin';
import {useLogout} from '../hooks/useLogout';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext(null);

export const AuthWrapper = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {login, loading: loadingL} = useLogin();
  const {logout, loading: loadingF} = useLogout();
  const {getUser, loading: loadingG} = useGetUser();
  useEffect(() => {
    // getUser().then(res => {
    //   setLoading(false);

    //   if (res.user && !loadingG) {
    //     setUser(res.user);
    //   }
    // });

    const fn = async () => {
      try {
        const rawValue = await AsyncStorage.getItem('user');
        const value = JSON.parse(rawValue);
        if (value !== null && user == null) {
          setLoading(false);
          setUser(value);
          console.log('Fetched user from async storage.');
        }
      } catch (error) {
        console.log('Error fetching  user from async storage. haha');
        console.log(error);
      }
    };
    fn();
  }, [user]);

  const loginF = async ({l, p}) => {
    const res = await login({
      login: l,
      password: p,
    });
    if (res.user && !loadingL) {
      try {
        console.log('Res.user ', res.user);
        await AsyncStorage.setItem('user', JSON.stringify(res.user));
        setUser(res.user);
        console.log('Stored user in async storage.');
      } catch (error) {
        console.log('Error storing user in async storage.');
        console.log(error);
      }
    }
    return res;
  };
  const logoutF = async () => {
    const res = await logout();

    if (res.value) {
      try {
        await AsyncStorage.removeItem('user');
        console.log('removed user from async storage.');
        setUser(null);
      } catch (error) {
        console.log('Error removing user from async storage.');
        console.log(error);
      }
    }
  };

  const value = useMemo(() => {
    return {isAuth: !!user, user, loginF, logoutF, loading};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, login, logout, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
