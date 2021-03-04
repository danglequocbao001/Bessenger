import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Login, SignUp, Dashboard } from '../container'
import { color } from '../utility'

const Stack = createStackNavigator()

function NavContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login"
            screenOptions={{
                headerShown: true,
                headerStyle: {backgroundColor: color.GREY},
                headerTintColor: color.WHITE,
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                }
            }}>
                <Stack.Screen 
                    name="Login" 
                    component={Login}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{headerLeft: null}}
                />
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default NavContainer