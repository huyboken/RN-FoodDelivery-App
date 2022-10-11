import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../contants';

const CategoryListItem = ({ name, isActive, selectCategory }) => {
    return (
        <View style={styles.container}>
            <Text
                style={
                    isActive ? styles.activeCategoryText : styles.inActiveCategoryText
                }
                onPress={() => selectCategory(name)}>
                {name}
            </Text>
        </View>
    );
};

export default CategoryListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.LIGHT_YELLOW,
        paddingHorizontal: 15,
        height: 50,
        justifyContent: 'center',
    },
    activeCategoryText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    inActiveCategoryText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.INACTIVE_GREY,
    },
});
