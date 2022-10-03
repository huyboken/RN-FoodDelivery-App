import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    ForgotPasswordScreen,
    HomeScreen,
    RegisterPhoneScreen,
    SigninScreen,
    SignupScreen,
    SplashScreen,
    VertificationScreen,
    WelcomeScreen,
} from '../screens';
import { useDispatch, useSelector } from 'react-redux';
import GeneralAction from '../actions/GeneralAction';

const Stack = createNativeStackNavigator();

const Navigators = () => {
    const { isAppLoading, token, isFirstTimeUse } = useSelector(
        state => state.generalState,
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GeneralAction.appStart());
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
                {isAppLoading ? (
                    <Stack.Screen name="Splash" component={SplashScreen} />
                ) : !token || token === null || token === '' ? (
                    <>
                        {isFirstTimeUse && (
                            <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        )}
                        <Stack.Screen name="Signin" component={SigninScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                        <Stack.Screen
                            name="ForgotPassword"
                            component={ForgotPasswordScreen}
                        />
                        <Stack.Screen
                            name="RegisterPhone"
                            component={RegisterPhoneScreen}
                        />
                        <Stack.Screen
                            name="Vertification"
                            component={VertificationScreen}
                        />
                    </>
                ) : (
                    <Stack.Screen name="Home" component={HomeScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigators;