import React from 'react'
import { View, Text } from 'react-native'

const SignUp = ({navigation}) => {
    return (
        <View>
            <Text onPress={()=>navigation.navigate('Dashboard')} >SignUp</Text>
        </View>
    )
}

export default SignUp
