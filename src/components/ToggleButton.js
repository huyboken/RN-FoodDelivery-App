import React, { useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../contants';

const containerStyle = (size, isActive) => ({
    backgroundColor: isActive ? Colors.DEFAULT_GREEN : Colors.DEFAULT_GREY,
    height: 32 * size,
    width: 64 * size,
    borderRadius: 32,
    padding: 3.6 * size
})

const toggleStyle = (size, animatedValue) => ({
    height: 24 * size,
    width: 24 * size,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 32,
    transform: [
        {
            translateX: animatedValue
        }
    ]
})

const ToggleButton = ({ size }) => {
    const [isActive, setIsActive] = useState(false)
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))

    const toggleHandle = () => {
        Animated.timing(animatedValue, {
            toValue: isActive ? 0 : 32 * size,
            duration: 250,
            easing: Easing.bounce,
            delay: 0,
            useNativeDriver: true
        }).start();
        setIsActive(!isActive)
    }
    return (
        <TouchableOpacity
            style={containerStyle(size, isActive)}
            activeOpacity={0.8}
            onPress={() => toggleHandle()}>
            <Animated.View style={toggleStyle(size, animatedValue)} />
        </TouchableOpacity>
    );
};

export default ToggleButton

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: Colors.DEFAULT_GREEN,
//         height: 32,
//         width: 64,
//         borderRadius: 32,
//         padding: 4
//     },
//     toggle: {
//         height: 24,
//         width: 24,
//         backgroundColor: Colors.DEFAULT_WHITE,
//         borderRadius: 32
//     }
// });
