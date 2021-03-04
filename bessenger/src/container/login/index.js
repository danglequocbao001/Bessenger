import React, {useContext, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {color, globalStyle} from '../../utility';
import {Logo, InputField, RoundCornerButton} from '../../component';
import {Store} from '../../context/store';
import {LOADING_START, LOADING_STOP} from '../../context/actions/type';
import {LoginRequest} from '../../network';
import {keys, setAsyncStorage} from '../../asyncStorage';
import {setUniqueValue} from '../../utility/constants';

const Login = ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const {email, password} = credentials;

  const handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  const onLoginPress = () => {
    if (!email) {
      alert('Email is required!');
    } else if (!password) {
      alert('Password is required!');
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      LoginRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            alert(res);
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            return;
          }
          setAsyncStorage(keys.uuid, res.user.uid);
          setUniqueValue(res.user.uid);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          navigation.replace('Dashboard');
        })
        .catch((err) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });
    }
  };

  return (
    <SafeAreaView style={[globalStyle.flex1]}>
      <View style={[globalStyle.containerCentered]}>
        <Logo />
      </View>
      <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
        <InputField
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => handleOnChange('email', text)}
        />
        <InputField
          placeholder="Enter password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => handleOnChange('password', text)}
        />
        <RoundCornerButton title="Login" onPress={() => onLoginPress()} />
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: color.PRIMARY,
          }}
          onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
