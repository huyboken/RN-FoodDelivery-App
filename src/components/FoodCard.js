import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { ApiContants, Colors, Fonts } from '../contants';
import { Display } from '../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StaticImageService } from '../services';

const FoodCard = ({ name, description, price, image }) => {
    const [itemCount, setItemCount] = useState(0);
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image
                    style={styles.image}
                    source={{
                        uri: StaticImageService.getGalleryImage(
                            image,
                            ApiContants.STATIC_IMAGE.SIZE.SQUARE,
                        ),
                    }}
                />
            </TouchableOpacity>
            <View style={styles.detailsContainer}>
                <TouchableOpacity>
                    <Text numberOfLines={1} style={styles.titleText}>
                        {name}
                    </Text>
                    <Text numberOfLines={2} style={styles.descriptionText}>
                        {description}
                    </Text>
                </TouchableOpacity>
                <View style={styles.footerContainer}>
                    <Text style={styles.priceText}>₫{price}</Text>
                    <View style={styles.itemAddContainer}>
                        {itemCount > 0 &&
                            <>
                                <AntDesign
                                    name="minus"
                                    color={Colors.DEFAULT_GREY}
                                    size={18}
                                    onPress={() => setItemCount(itemCount - 1)}
                                />
                                <Text style={styles.itemCountText}>{itemCount}</Text>
                            </>
                        }
                        <AntDesign
                            name="plus"
                            color={Colors.DEFAULT_YELLOW}
                            size={18}
                            onPress={() => setItemCount(itemCount + 1)}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default FoodCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 5,
        flexDirection: 'row',
        borderRadius: 10,
        elevation: 2,
        backgroundColor: Colors.LIGHT_GREY,

        shadowColor: Colors.DEFAULT_BLACK,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 3, height: 3 },
    },
    image: {
        height: 100,
        width: 100,
        margin: 6,
        borderRadius: 8,
    },
    detailsContainer: {
        marginHorizontal: 5,
    },
    titleText: {
        width: Display.setWidth(60),
        color: Colors.DEFAULT_BLACK,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        marginBottom: 8,
    },
    descriptionText: {
        width: Display.setWidth(60),
        color: Colors.DEFAULT_GREY,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        marginBottom: 8,
    },
    priceText: {
        color: Colors.DEFAULT_YELLOW,
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    itemAddContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_GREY2,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    itemCountText: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginHorizontal: 8,
    },
});
