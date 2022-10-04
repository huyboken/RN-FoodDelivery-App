import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../contants';
import { StaticImageService } from '../services';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RestaurantCard = ({
    navigate,
    id,
    images: { poster },
    name,
    tags,
    distance,
    time,
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={() => navigate(id)}>
            <Image
                source={{ uri: StaticImageService.getPoster(poster) }}
                style={styles.posterStyle}
            />
            <Text style={styles.titleText}>{name}</Text>
            <Text style={styles.tagText}>{tags?.join(' • ')}</Text>
            <View style={styles.footerContainer}>
                <View style={styles.rowAndCenter}>
                    <FontAwesome name="star" size={14} color={Colors.DEFAULT_YELLOW} />
                    <Text style={styles.ratingText}>4</Text>
                    <Text style={styles.reviewsText}>({10})</Text>
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
        </TouchableOpacity>
    );
};

export default RestaurantCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        color: Colors.DEFAULT_WHITE,
        borderRadius: 10,
        marginBottom: 5,
        elevation: 3,
    },
    posterStyle: {
        width: 1920 * 0.15,
        height: 1080 * 0.15,
        borderRadius: 10,
        margin: 5,
        backgroundColor: 'red',
    },
    titleText: {
        fontSize: 15,
        lineHeight: 15 * 1.4,
        color: Colors.DEFAULT_BLACK,
        marginLeft: 8,
        fontFamily: Fonts.POPPINS_BOLD,
    },
    tagText: {
        fontSize: 11,
        lineHeight: 11 * 1.4,
        color: Colors.DEFAULT_GREY,
        marginLeft: 8,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginBottom: 5,
        width: 1920 * 0.15,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginBottom: 6,
    },
    rowAndCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    reviewsText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    timeAndDistanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginHorizontal: 3,
        backgroundColor: Colors.LIGHT_YELLOW,
        borderRadius: 12,
    },
    timeAndDistanceText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_YELLOW,
    },
});
