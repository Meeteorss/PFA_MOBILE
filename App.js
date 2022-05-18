/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import MyCoordinatesScreen from './src/screens/MyCoordinatesScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import EventsScreen from './src/screens/EventsScreen';
import {AuthWrapper} from './src/context/AuthContext';
import {useGetUser} from './src/hooks/useGetUser';
import DetailsScreen from './src/screens/DetailsScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  // const {isAuth, loading} = useAuthContext();
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {getUser, loading: loadingG} = useGetUser();
  useEffect(() => {
    getUser().then(res => {
      setLoading(false);
      if (res.user && !loadingG) {
        setUser(res.user);
        setIsAuth(true);
      }
    });
  }, [setUser, getUser, loadingG]);
  return (
    <AuthWrapper>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={'Login'} component={LoginScreen} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="MyCoordinates" component={MyCoordinatesScreen} />
          <Stack.Screen name="Contacts" component={ContactsScreen} />
          <Stack.Screen name="Events" component={EventsScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
  },
});

export default App;
