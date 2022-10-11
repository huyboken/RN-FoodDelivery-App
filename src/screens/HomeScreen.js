import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView
} from 'react-native';
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { CategoryMenuItem, Separator, RestaurantCard, RestaurantMediumCard } from '../components';
import { Colors, Fonts, Mock } from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { RestaurantService } from '../services';
import { Display } from '../utils';

const sortStyle = isActive =>
    isActive
        ? styles.sortListItem
        : { ...styles.sortListItem, borderBottomColor: Colors.DEFAULT_WHITE };

const HomeScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [activeCategory, setActiveCategory] = useState();
    const [restaurants, setRestaurants] = useState(null);
    const [activeSortItem, setActiveSortItem] = useState('recent');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            RestaurantService.getRestaurants().then(response => {
                if (response?.status) {
                    setRestaurants(response?.data);
                }
            });
        });
        return unsubscribe;
    }, []);

    return (
        <SafeAreaProvider style={styles.container}>
            <View
                style={{ height: insets.bottom, backgroundColor: Colors.DEFAULT_GREEN }}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={Colors.DEFAULT_GREEN}
                    translucent
                />
            </View>
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.backgroundCurvedContainer} />
            <View style={styles.headerContainer}>
                <View style={styles.locationContainer}>
                    <Ionicons
                        name="location-outline"
                        size={15}
                        color={Colors.DEFAULT_WHITE}
                    />
                    <Text style={styles.locationText}>Giao đến</Text>
                    <Text style={styles.selectedLocationText}>NHÀ</Text>
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={15}
                        color={Colors.DEFAULT_YELLOW}
                    />
                    <Feather
                        name="bell"
                        size={24}
                        color={Colors.DEFAULT_WHITE}
                        style={{ position: 'absolute', right: 0 }}
                    />
                    <View style={styles.alertBadge}>
                        <Text style={styles.alertBadgeText}>12</Text>
                    </View>
                </View>
                <View style={styles.searchContainer}>
                    <View style={styles.searchSection}>
                        <Ionicons
                            name="search-outline"
                            size={25}
                            color={Colors.DEFAULT_GREY}
                        />
                        <Text style={styles.searchSectionText}>Tìm kiếm...</Text>
                    </View>
                    <Feather
                        name="sliders"
                        size={20}
                        color={Colors.DEFAULT_YELLOW}
                        style={{ marginRight: 10 }}
                    />
                </View>
                <View style={styles.categoriesContainer}>
                    {Mock.CATEGORIES.map(({ name, logo }) => (
                        <CategoryMenuItem
                            name={name}
                            logo={logo}
                            key={name}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                    ))}
                </View>
            </View>
            <ScrollView
                style={styles.listContainer}
                showsVerticalScrollIndicator={false}>
                <View style={styles.horizontalListContainer}>
                    <View style={styles.listHeader}>
                        <Text style={styles.listHeaderTitle}>Đánh giá hàng đầu</Text>
                        <Text style={styles.listHeaderSubTitle}>Xem tất cả</Text>
                    </View>
                </View>
                <FlatList
                    data={restaurants}
                    key={item => item?.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={() => <Separator width={20} />}
                    ListFooterComponent={() => <Separator width={20} />}
                    ItemSeparatorComponent={() => <Separator width={10} />}
                    renderItem={({ item }) => (
                        <RestaurantCard
                            {...item}
                            navigate={restauranId =>
                                navigation.navigate('Restaurant', { restauranId })
                            }
                        />
                    )}
                />
                <View style={styles.sortListContainer}>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === 'recent')}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('recent')}>
                        <Text style={styles.sortListItemText}>Gần đây</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === 'favorite')}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('favorite')}>
                        <Text style={styles.sortListItemText}>Yêu thích</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === 'rating')}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('rating')}>
                        <Text style={styles.sortListItemText}>Xếp hạng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === 'popular')}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('popular')}>
                        <Text style={styles.sortListItemText}>Nổi tiếng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={sortStyle(activeSortItem === 'trending')}
                        activeOpacity={0.8}
                        onPress={() => setActiveSortItem('trending')}>
                        <Text style={styles.sortListItemText}>Thịnh hành</Text>
                    </TouchableOpacity>
                </View>
                {restaurants?.map(item => (
                    <RestaurantMediumCard {...item} key={item?.id} />
                ))}
                <Separator height={Display.setHeight(5)} />
            </ScrollView>
        </SafeAreaProvider>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.SECONDARY_WHITE,
    },
    backgroundCurvedContainer: {
        backgroundColor: Colors.DEFAULT_GREEN,
        height: 2000,
        position: 'absolute',
        top: Platform.isPad ? -1 * (2000 - 430) : -1 * (2000 - 230),
        width: 2000,
        borderRadius: 2000,
        alignSelf: 'center',
        zIndex: -1,
    },
    headerContainer: {
        justifyContent: 'space-evenly',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 20,
    },
    locationText: {
        color: Colors.DEFAULT_WHITE,
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    selectedLocationText: {
        color: Colors.DEFAULT_YELLOW,
        marginLeft: 5,
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    alertBadge: {
        borderRadius: 32,
        backgroundColor: Colors.DEFAULT_YELLOW,
        position: 'absolute',
        height: 16,
        width: 16,
        top: -10,
        right: -2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertBadgeText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
    },
    searchContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        height: 45,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    searchSectionText: {
        color: Colors.DEFAULT_GREY,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginLeft: 10,
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    listContainer: {
        paddingVertical: 5,
        zIndex: -5,
    },
    horizontalListContainer: {
        marginTop: 30,
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
        marginTop: Platform.OS === 'android' && 15,
        marginHorizontal: 20,
    },
    listHeaderTitle: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    listHeaderSubTitle: {
        color: Colors.DEFAULT_YELLOW,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    sortListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        elevation: 1,
        alignItems: 'center',
        backgroundColor: Colors.DEFAULT_WHITE,
        marginTop: 8,

        shadowColor: Colors.DEFAULT_GREY,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 3, height: 3 },
    },
    sortListItemText: {
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        fontSize: 13,
        lineHeight: 13 * 1.4,
    },
    sortListItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.DEFAULT_YELLOW,
        height: 40,
    },
});
