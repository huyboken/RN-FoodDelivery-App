import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    ForgotPasswordScreen,
    HomeScreen,
    RegisterPhoneScreen,
    SigninScreen,
    SignupScreen,
    SplashScreen,
    VertificationScreen,
    WelcomeScreen
} from "../screens";
import { connect } from "react-redux";

const Stack = createNativeStackNavigator();

const Navigators = ({ token }) => {
    console.log(token);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    !token ? (
                        <>
                            <Stack.Screen name="Splash" component={SplashScreen} />
                            <Stack.Screen name="Welcome" component={WelcomeScreen} />
                            <Stack.Screen name="Signin" component={SigninScreen} />
                            <Stack.Screen name="Signup" component={SignupScreen} />
                            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                            <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
                            <Stack.Screen name="Vertification" component={VertificationScreen} />
                        </>
                    ) : (
                        < Stack.Screen name="Home" component={HomeScreen} />
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const mapStateToProps = state => {
    return {
        token: state.generalState.token,
    }
}

export default connect(mapStateToProps)(Navigators);