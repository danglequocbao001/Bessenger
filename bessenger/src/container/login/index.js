import React from 'react'
import { View, Text } from 'react-native'

const Login = ({navigation}) => {
    return (
        <View>
            <Text onPress={()=>navigation.navigate('SignUp')} >Login</Text>
        </View>
    )
}

export default Login
