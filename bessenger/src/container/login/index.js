import React, {useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {color, globalStyle} from '../../utility';
import {Logo, InputField, RoundCornerButton} from '../../component';

const Login = ({navigation}) => {
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
      alert(JSON.stringify(credentials));
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
