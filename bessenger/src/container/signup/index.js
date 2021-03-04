import React from 'react'
import { Text, SafeAreaView } from 'react-native'

const SignUp = ({navigation}) => {
    return (
        <SafeAreaView>
            <Text onPress={()=>navigation.navigate('Dashboard')} >SignUp</Text>
        </SafeAreaView>
    )
}

export default SignUp
