import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts, Images } from '../contants';
import { StaticImageService } from '../services';
import { Display } from '../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RestaurantMediumCard = ({ images: { logo }, name, distance, time, tags }) => {
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
                <Text numberOfLines={1} style={styles.tagsText}>
                    {tags?.join(' • ')}
                </Text>
                <View style={styles.deliveryDetailsContainer}>
                    <View style={styles.rowAndCenter}>
                        <Image
                            source={Images.DELIVERY_CHARGE}
                            style={styles.deliveryDetailsIcon}
                        />
                        <Text style={styles.deliveryDetailsText}>Giao hàng miễn phí</Text>
                    </View>
                    <View style={styles.rowAndCenter}>
                        <Image
                            source={Images.DELIVERY_TIME}
                            style={styles.deliveryDetailsIcon}
                        />
                        <Text style={styles.deliveryDetailsText}>{time} min</Text>
                    </View>
                    <View style={styles.rowAndCenter}>
                        <Ionicons
                            name="location-outline"
                            size={15}
                            color={Colors.DEFAULT_YELLOW}
                        />
                        <Text style={styles.deliveryDetailsText}>{distance}</Text>
                    </View>
                    {/* <View style={styles.rowAndCenter}>
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
                    </View> */}
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
        backgroundColor: Colors.DEFAULT_WHITE,

        shadowColor: Colors.DEFAULT_GREY,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 3, height: 3 },
    },
    posterStyle: {
        width: Display.setWidth(20),
        height: Display.setWidth(20),
        borderRadius: 10,
        margin: 5,
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
    deliveryDetailsIcon: {
        height: 16,
        width: 16,
    },
    deliveryDetailsText: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        marginLeft: 3,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DEFAULT_BLACK,
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
    tagsText: {
        fontSize: 11,
        lineHeight: 11 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_GREY,
        marginBottom: 7,
    },
    deliveryDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
