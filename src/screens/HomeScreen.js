/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';
import axios from 'axios';
import {useAuthContext} from '../context/AuthContext';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.100.3:4000/',
  headers: {'content-type': 'application/json'},
  withCredentials: true,
});
const HomeScreen = ({navigation}) => {
  const {isAuth, logoutF, loading} = useAuthContext();
  useEffect(() => {
    if (!loading && !isAuth) {
      navigation.push('Login');
    }
  }, [isAuth, navigation, loading]);

  return (
    <View style={styles.home}>
      <View style={styles.navbar}>
        <Button
          style={styles.button}
          color={'#52a160'}
          title="Account"
          onPress={() => {
            let clicked = false;
            console.log('clicked', clicked);
            if (clicked === false) {
              navigation.push('Account');
              clicked = true;
            }
          }}
        />
        <Button
          style={styles.button}
          color={'#52a160'}
          title="My coordinates"
          onPress={() => {
            let clicked = false;
            console.log('clicked');

            navigation.push('MyCoordinates');
          }}
        />
        <Button
          style={styles.button}
          color={'#52a160'}
          title="Contacts"
          onPress={() => {
            let clicked = false;
            console.log('clicked', clicked);
            if (clicked === false) {
              navigation.push('Contacts');
              clicked = true;
            }
          }}
        />

        <Button
          style={styles.button}
          color={'#52a160'}
          title="Logout"
          onPress={async () => {
            await logoutF();
          }}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.logo}>EZ Coordinator </Text>
          <Text style={styles.lorem}>
            EzCoordinator is an application that allows to combine addresses,
            contact information, photos and GPS coordinates in a single ID with
            QR code with high sharing capabilities.
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  home: {flex: 1, flexDirection: 'column', backgroundColor: '#242424'},
  navbar: {
    height: 48,
    backgroundColor: '#52a160',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242424',
  },
  button: {
    backgroundColor: '#52a160',
    color: '#000',
  },
  logo: {
    color: '#52a160',
    fontSize: 40,
    textAlign: 'center',
  },
  lorem: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    maxWidth: '80%',
  },
  hero: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
