/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useAuthContext} from '../context/AuthContext';
const LoginScreen = ({navigation}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const {loginF, loading, isAuth} = useAuthContext();

  useEffect(() => {
    if (!loading && isAuth) {
      navigation.push('Home');
    }
  }, [isAuth, loading, navigation]);

  if (isAuth) {
    return (
      <View>
        <Text> Loading haha </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Login..."
          placeholderTextColor="#003f5c"
          onChangeText={Login => setLogin(Login)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password...."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
        <Text
          style={styles.loginText}
          onPress={async () => {
            try {
              const res = await loginF({l: login, p: password});

              console.log('Response :  ', res);
              if (res.errors) {
                Alert.alert(res.errors[0].message);
              } else {
                navigation.navigate('Home');
              }
            } catch (err) {
              console.log('Err : ', err);
            }
          }}>
          LOGIN
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242424',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#95c2a1',
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
    width: '70%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    backgroundColor: '#36473b',
  },
});
export default LoginScreen;
