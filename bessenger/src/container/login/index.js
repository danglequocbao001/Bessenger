import React from 'react'
import { Text, SafeAreaView } from 'react-native'

const Login = ({navigation}) => {
    return (
        <SafeAreaView>
            <Text onPress={()=>navigation.navigate('SignUp')} >Login</Text>
        </SafeAreaView>
    )
}

export default Login
