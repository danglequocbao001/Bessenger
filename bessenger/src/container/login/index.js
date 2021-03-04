import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { color, globalStyle } from '../../utility';
import { Logo, InputField, RoundCornerButton } from '../../component'

const Login = ({navigation}) => {
  return (
    <SafeAreaView style={[globalStyle.flex1]} >
        <View style={[globalStyle.containerCentered]}>
            <Logo  />
        </View>
        <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
            <InputField placeholder="Enter email"/>
            <InputField placeholder="Enter password" secureTextEntry={true}/>
            <RoundCornerButton title="Login" />
            <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: color.PRIMARY
            }}
            onPress={() => navigation.navigate('SignUp')}
            > Sign Up
            </Text>
        </View>
    </SafeAreaView>
  );
};

export default Login;
