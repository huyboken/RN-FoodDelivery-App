import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import { Colors, Fonts, Images } from '../contants';
import { Display } from '../utils';

const SplashScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.DEFAULT_GREEN}
                translucent
            />
            <Image source={Images.PLATE} resizeMode="contain" style={styles.image} />
            <Text style={styles.titleText}>Food Delivery</Text>
        </SafeAreaView>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DEFAULT_GREEN,
    },
    image: {
        height: Display.setHeight(30),
        width: Display.setWidth(60),
    },
    titleText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 32,
        fontFamily: Fonts.POPPINS_LIGHT,
    },
});
