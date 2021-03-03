import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Login, SignUp, Dashboard } from '../container'
import { color } from '../utility'

const Stack = createStackNavigator()

function NavContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavContainer