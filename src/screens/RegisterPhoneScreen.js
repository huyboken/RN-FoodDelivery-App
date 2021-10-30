import React, { useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { FlagItem, Separator, ToggleButton } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, CountryCode, Fonts, Images } from '../contants';
import Display from '../untils/Display';
import { StaticImageService } from '../services';

const getDropdownStyle = (y) => ({ ...styles.countryDropdown, top: y + 60 });

const RegisterPhoneScreen = ({ navigation }) => {
    const [selectedCountry, setSelectedContry] = useState(
        CountryCode.find(country => country.name === "Viet Nam"),
    );
    const [inputsContainerY, setInputsContainerY] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownLayout, setDropdownLayout] = useState({});
    const [phoneNumber, setPhoneNumber] = useState("")

    const closeDropdown = (pageX, pageY) => {
        if (isDropdownOpen) {
            if (pageX < dropdownLayout?.x ||
                pageX > dropdownLayout?.x + dropdownLayout?.width ||
                pageY < dropdownLayout?.y ||
                pageY > dropdownLayout?.y + dropdownLayout?.height) {
                setIsDropdownOpen(false)
            }
        }
    }
    return (
        <View
            style={styles.container}
            onStartShouldSetResponder={({
                nativeEvent: { pageX, pageY } }) =>
                closeDropdown(pageX, pageY)
            }>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.headerContainer}>
                <Ionicons
                    name="chevron-back-outline"
                    size={30}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTitle}>Đăng ký bằng điện thoại</Text>
            </View>
            <Text style={styles.title}>Đăng ký bằng điện thoại</Text>
            <Text style={styles.content}>Nhập số điện thoại đăng ký của bạn để đăng nhập.</Text>
            <View
                style={styles.inputsContainer}
                onLayout={({
                    nativeEvent: {
                        layout: { y }
                    }
                }) => setInputsContainerY(y)}>
                <TouchableOpacity style={styles.countryListContainer} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <Image
                        source={{ uri: StaticImageService.getFlagIcon(selectedCountry.code) }}
                        style={styles.flatIcon}
                    />
                    <Text style={styles.countryCodeText}>{selectedCountry.dial_code} </Text>
                    <MaterialIcons name="keyboard-arrow-down" size={18} />
                </TouchableOpacity>
                <View style={styles.phoneInputContainer}>
                    <TextInput
                        placeholder="Số điện thoại"
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        keyboardType="number-pad"
                        onFocus={() => setIsDropdownOpen(false)}
                        style={styles.inputText}
                        onChangeText={text => setPhoneNumber(selectedCountry?.dial_code + text)}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={styles.signupButton}
                activeOpacity={0.8}
                onPress={() => {
                    navigation.navigate('Vertification', {phoneNumber})
                }}>
                <Text style={styles.signupButtonText}>Tiếp tục</Text>
            </TouchableOpacity>
            {isDropdownOpen && (
                <View
                    style={getDropdownStyle(inputsContainerY)}
                    onLayout={({
                        nativeEvent: { layout: { x, y, height, width },
                        },
                    }) => setDropdownLayout({ x, y, height, width })}>
                    <FlatList
                        data={CountryCode}
                        keyExtractor={(item) => item.code}
                        renderItem={({ item }) => (
                            <FlagItem {...item} onPress={(country => {
                                setSelectedContry(country)
                                setIsDropdownOpen(false)
                            })} />)}
                    />
                </View>
            )}
        </View>
    );
};

export default RegisterPhoneScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: 'center'
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        marginTop: 50,
        marginHorizontal: 20
    },
    content: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20,
    },
    inputsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 50,
    },
    countryListContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        width: Display.setWidth(22),
        marginRight: 10,
        borderRadius: 8,
        height: Display.setHeight(6),
        justifyContent: "space-evenly",
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        flexDirection: 'row'
    },
    phoneInputContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        justifyContent: 'center',
        flex: 1
    },
    flatIcon: {
        height: 20,
        width: 20
    },
    countryCodeText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_MEDIUM
    },
    inputText: {
        fontSize: 18,
        textAlignVertical: 'center',
        padding: 0,
        height: Display.setHeight(6),
        color: Colors.DEFAULT_BLACK
    },
    countryDropdown: {
        backgroundColor: Colors.LIGHT_GREY,
        position: 'absolute',
        width: Display.setWidth(80),
        height: Display.setHeight(50),
        marginLeft: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        zIndex: 3,
    },
    signupButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 8,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.POPPINS_MEDIUM
    },
});
