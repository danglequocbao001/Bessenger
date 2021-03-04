import React, {useContext, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {color, globalStyle} from '../../utility';
import {Logo, InputField, RoundCornerButton} from '../../component';
import {Store} from '../../context/store';
import {AddUser, SignUpRequest} from '../../network';
import {LOADING_START, LOADING_STOP} from '../../context/actions/type';
import {setAsyncStorage, keys} from '../../asyncStorage';
import {setUniqueValue} from '../../utility/constants';
import firebase from '../../firebase/config';

const SignUp = ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const {name, email, password, confirmPassword} = credentials;

  const handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  const onSignUpPress = () => {
    if (!name) {
      alert('Name is required!');
    } else if (!email) {
      alert('Email is required!');
    } else if (!password) {
      alert('Password is required!');
    } else if (password != confirmPassword) {
      alert('Password did not match');
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      SignUpRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            alert(res);
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            return;
          }
          let uid = firebase.auth().currentUser.uuid;
          let profileImg = '';
          AddUser(name, email, uid, profileImg)
            .then(() => {
              setAsyncStorage(keys.uuid, uid);
              setUniqueValue(uid);
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
          placeholder="Enter name"
          value={name}
          onChangeText={(text) => handleOnChange('name', text)}
        />
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
        <InputField
          placeholder="Confirm password"
          value={confirmPassword}
          secureTextEntry={true}
          onChangeText={(text) => handleOnChange('confirmPassword', text)}
        />
        <RoundCornerButton title="Sign Up" onPress={() => onSignUpPress()} />
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: color.PRIMARY,
          }}
          onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
