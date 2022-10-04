import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../contants';
import { StaticImageService } from '../services';
import { Display } from '../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RestaurantMediumCard = ({ images: { logo }, name, distance, time }) => {
    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={{ uri: StaticImageService.getLogo(logo) }}
                    style={styles.posterStyle}
                />
            </View>
            <View style={styles.labelContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{name}</Text>
                    <View style={styles.rowAndCenter}>
                        <FontAwesome name="star" size={14} color={Colors.DEFAULT_YELLOW} />
                        <Text style={styles.ratingText}>4.2</Text>
                        <Text style={styles.reviewsText}>({233})</Text>
                    </View>
                </View>
                <View style={styles.rowAndCenter}>
                    <View style={styles.timeAndDistanceContainer}>
                        <Ionicons
                            name="location-outline"
                            size={15}
                            color={Colors.DEFAULT_YELLOW}
                        />
                        <Text style={styles.timeAndDistanceText}>{distance}</Text>
                    </View>
                    <View style={styles.timeAndDistanceContainer}>
                        <Ionicons
                            name="ios-time-outline"
                            size={15}
                            color={Colors.DEFAULT_YELLOW}
                        />
                        <Text style={styles.timeAndDistanceText}>{time}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default RestaurantMediumCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        elevation: 1,
        borderRadius: 8,
        marginTop: 8,
        color: Colors.DEFAULT_WHITE,
    },
    posterStyle: {
        width: Display.setWidth(20),
        height: Display.setWidth(20),
        borderRadius: 10,
        margin: 5,
        backgroundColor: 'red',
    },
    labelContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
        marginBottom: 5,
    },
    rowAndCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        marginLeft: 5,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    reviewsText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_BLACK,
    },
    timeAndDistanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 12,
        backgroundColor: Colors.LIGHT_YELLOW,
        marginHorizontal: 3,
    },
    timeAndDistanceText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_YELLOW,
    },
});
