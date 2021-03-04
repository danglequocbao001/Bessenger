import React, {useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {color, globalStyle} from '../../utility';
import {Logo, InputField, RoundCornerButton} from '../../component';

const SignUp = ({navigation}) => {
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
      alert(JSON.stringify(credentials));
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
