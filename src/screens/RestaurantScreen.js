import {
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View, Platform
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RestaurantService, StaticImageService } from '../services';
import { Display } from '../utils';
import { ApiContants, Colors, Fonts, Images } from '../contants';
import { Separator, CategoryListItem, FoodCard } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ListHeader = () => (
    <View
        style={{
            flexDirection: 'row',
            flex: 1,
            width: 40,
            justifyContent: 'flex-end',
        }}>
        <View
            style={{
                backgroundColor: Colors.LIGHT_YELLOW,
                width: 20,
                borderTopLeftRadius: 64,
                borderBottomLeftRadius: 64,
                overflow: 'hidden'
            }}
        />
    </View>
);

const ListFooter = () => (
    <View
        style={{
            flexDirection: 'row',
            flex: 1,
            width: 40,
        }}>
        <View
            style={{
                backgroundColor: Colors.LIGHT_YELLOW,
                width: 20,
                borderTopRightRadius: 64,
                borderBottomRightRadius: 64,
                overflow: 'hidden'
            }}
        />
    </View>
);

const Restaurant = () => {
    const { params } = useRoute();
    const navigation = useNavigation();

    const [restaurant, setRestaurant] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        RestaurantService.getOneRestaurantById(params.restauranId).then(
            response => {
                setSelectedCategory(response?.data?.categories[0])
                setRestaurant(response?.data);
            },
        );
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={'transparent'}
            />
            <>
                <Image
                    source={{
                        uri: StaticImageService.getGalleryImage(
                            restaurant?.images?.cover,
                            ApiContants.STATIC_IMAGE.SIZE.SQUARE,
                        ),
                    }}
                    style={styles.backgroundImage}
                />
                <ScrollView>
                    <Separator height={Display.setHeight(35)} />
                    <View style={styles.mainContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{restaurant?.name}</Text>
                            <Ionicons
                                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                                color={Colors.DEFAULT_YELLOW}
                                size={24}
                                onPress={() => setIsBookmarked(!isBookmarked)}
                            />
                        </View>
                        <Text style={styles.tagText}>{restaurant?.tags.join(' • ')}</Text>
                        <View style={styles.ratingReviewsContainer}>
                            <FontAwesome
                                name={'star'}
                                size={18}
                                color={Colors.DEFAULT_YELLOW}
                            />
                            <Text style={styles.ratingText}>4.2</Text>
                            <Text style={styles.reviewsText}>(455 đánh giá)</Text>
                        </View>
                        <View style={styles.deliveryDetailsContainer}>
                            <View style={styles.rowAndCenter}>
                                <Image
                                    style={styles.deliveryDetailsIcon}
                                    source={Images.DELIVERY_CHARGE}
                                />
                                <Text style={styles.deliveryDetailsText}>
                                    Free Delivery
                                </Text>
                            </View>
                            <View style={styles.rowAndCenter}>
                                <Image
                                    style={styles.deliveryDetailsIcon}
                                    source={Images.DELIVERY_TIME}
                                />
                                <Text style={styles.deliveryDetailsText}>
                                    {restaurant?.time} min
                                </Text>
                            </View>
                            <View style={styles.rowAndCenter}>
                                <Image
                                    style={styles.deliveryDetailsIcon}
                                    source={Images.MARKER}
                                />
                                <Text style={styles.deliveryDetailsText}>
                                    {(restaurant?.distance / 1000).toFixed(1)} km
                                </Text>
                            </View>
                            <View style={styles.restaurantType}>
                                <Text style={styles.restaurantTypeText}>
                                    {restaurant?.type}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.categoriesContainer}>
                            <FlatList
                                data={restaurant?.categories}
                                keyExtractor={item => item}
                                ListHeaderComponent={() => <ListHeader />}
                                ListFooterComponent={() => <ListFooter />}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <CategoryListItem
                                        name={item}
                                        isActive={item === selectedCategory}
                                        selectCategory={category => setSelectedCategory(category)}
                                    />
                                )}
                            />
                        </View>
                        <View style={styles.foodList}>
                            {restaurant?.foods?.filter(food => food?.category === selectedCategory)?.map(item => (
                                <FoodCard key={item?.id} {...item} />
                            ))}
                            <Separator height={Display.setHeight(2)} />
                        </View>
                    </View>
                </ScrollView>
            </>
        </View>
    );
};

export default Restaurant;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        height: Display.setWidth(100),
        width: Display.setWidth(100),
    },
    mainContainer: {
        backgroundColor: Colors.SECONDARY_WHITE,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        marginTop: 15,
    },
    title: {
        fontSize: 23,
        lineHeight: 23 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    tagText: {
        marginHorizontal: 25,
        marginTop: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DEFAULT_GREY,
    },
    ratingReviewsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 5,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    reviewsText: {
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_BLACK,
    },
    deliveryDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 10,
        justifyContent: 'space-between',
    },
    deliveryDetailsText: {
        marginLeft: 3,
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_BLACK,
    },
    deliveryDetailsIcon: {
        height: 16,
        width: 16,
    },
    rowAndCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    restaurantType: {
        backgroundColor: Colors.LIGHT_YELLOW,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
    },
    restaurantTypeText: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_YELLOW,
    },
    categoriesContainer: {
        marginVertical: 20,
    },
    foodList: {
        marginHorizontal: 15
    }
});
