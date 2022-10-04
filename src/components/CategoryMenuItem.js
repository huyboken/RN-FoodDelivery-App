import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, Fonts, Images } from '../contants';

const CategoryMenuItem = ({ name, logo, activeCategory, setActiveCategory }) => {
    return (
        <TouchableOpacity
            onPress={() => setActiveCategory(name)}
            style={styles.category()}>
            <Image
                style={styles.categoryIcon(activeCategory === name)}
                source={Images[logo]}
            />
            <Text style={styles.categoryText(activeCategory === name)}>{name}</Text>
        </TouchableOpacity>
    );
};

export default CategoryMenuItem;

const styles = StyleSheet.create({
    category: (marginTop = 0) => ({
        alignItems: 'center',
        marginTop,
    }),
    categoryIcon: isActive => ({
        height: 30,
        width: 30,
        opacity: isActive ? 1 : 0.5,
    }),
    categoryText: isActive => ({
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_WHITE,
        marginTop: 5,
        opacity: isActive ? 1 : 0.5,
    }),
});
