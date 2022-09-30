import React, { useState } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Separator, ToggleButton } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors, Fonts, Images } from '../contants';
import Display from '../utils/Display';
import { AuthencationService } from '../services';
import LottieView from 'lottie-react-native';

const inputStyle = state => {
    switch (state) {
        case 'valid':
            return {
                ...styles.inputContainer,
                borderWidth: 1,
                borderColor: Colors.SECONDARY_GREEN
            }
        case 'invalid':
            return {
                ...styles.inputContainer,
                borderWidth: 1,
                borderColor: Colors.DEFAULT_RED
            }
        default:
            return styles.inputContainer
    }
}

const showMarker = state => {
    switch (state) {
        case 'valid':
            return (
                <AntDesign
                    name="checkcircleo"
                    color={Colors.SECONDARY_GREEN}
                    size={18}
                    style={{ marginLeft: 5 }}
                />
            )
        case 'invalid':
            return (
                <AntDesign
                    name="closecircleo"
                    color={Colors.DEFAULT_RED}
                    size={18}
                    style={{ marginLeft: 5 }}
                />
            )
        default:
            return null
    }
}


const SignupScreen = ({ navigation }) => {
    const [isPasswordShow, setPasswordShow] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [emailState, setEmailState] = useState('default');
    const [usernameState, setUsernameState] = useState('default');

    const register = () => {
        let user = {
            username,
            email,
            password
        }
        console.log(user);
        setIsLoading(true)
        AuthencationService.register(user).then(response => {
            setIsLoading(false)
            console.log(response);
            if (!response?.status) {
                setErrorMessage(response?.message)
            };
        });
        // navigation.navigate('RegisterPhone')
    };

    const checkUserExist = async (type, value) => {
        if (value?.length > 0) {
            AuthencationService.checkUserExist(type, value).then(response => {
                if (response?.status) {
                    type === 'email' && emailErrorMessage ? setEmailErrorMessage('') : null;
                    type === 'username' && usernameErrorMessage ? setUsernameErrorMessage('') : null;
                    type === 'email' ? setEmailState('valid') : null;
                    type === 'username' ? setUsernameState('valid') : null;
                } else {
                    type === 'email' ? setEmailErrorMessage(response?.message) : null;
                    type === 'username' ? setUsernameErrorMessage(response?.message) : null;
                    type === 'email' ? setEmailState('invalid') : null;
                    type === 'username' ? setUsernameState('invalid') : null;
                }
            })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
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
                <Text style={styles.headerTitle}>Đăng kí</Text>
            </View>
            <Text style={styles.title}>Tạo tài khoản</Text>
            <Text style={styles.content}>Nhập tên, email và mật khẩu của bạn</Text>
            <View style={inputStyle(usernameState)}>
                <View style={styles.inputSubContainer}>
                    <Feather
                        name="user"
                        size={22}
                        color={Colors.DEFAULT_GREY}
                        style={{ marginRight: 10 }}
                    />
                    <TextInput
                        placeholder="Tên đăng nhập"
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                        onChangeText={(text) => setUsername(text)}
                        onEndEditing={({ nativeEvent: { text } }) => checkUserExist('username', text)}
                    />
                    {showMarker(usernameState)}
                </View>
            </View>
            <Text style={styles.errorMessage}>{usernameErrorMessage}</Text>
            <View style={inputStyle(emailState)}>
                <View style={styles.inputSubContainer}>
                    <Feather
                        name="mail"
                        size={22}
                        color={Colors.DEFAULT_GREY}
                        style={{ marginRight: 10 }}
                    />
                    <TextInput
                        placeholder="Địa chỉ Email"
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                        onChangeText={(text) => setEmail(text)}
                        onEndEditing={({ nativeEvent: { text } }) => checkUserExist('email', text)}
                    />
                    {showMarker(emailState)}
                </View>
            </View>
            <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather
                        name="lock"
                        size={22}
                        color={Colors.DEFAULT_GREY}
                        style={{ marginRight: 10 }}
                    />
                    <TextInput
                        secureTextEntry={isPasswordShow ? false : true}
                        placeholder="Mật khẩu"
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Feather
                        name={isPasswordShow ? "eye" : "eye-off"}
                        size={22}
                        color={Colors.DEFAULT_GREY}
                        style={{ marginRight: 10 }}
                        onPress={() => setPasswordShow(!isPasswordShow)}
                    />
                </View>
            </View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => register()}>
                {isLoading ? (
                    <LottieView source={Images.LOADING} autoPlay />
                ) : (
                    <Text style={styles.signupButtonText}>Tạo tài khoản</Text>
                )}

            </TouchableOpacity>
            <Text style={styles.orText}>HOẶC</Text>
            <TouchableOpacity style={styles.facebookButton}>
                <View style={styles.socialButtonContainer}>
                    <View style={styles.signupButtonLogoContainer}>
                        <Image source={Images.FACEBOOK} style={styles.signupButtonLogo} />
                    </View>
                    <Text style={styles.socialSignupButtonText}>Kết nối với Facebook</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton}>
                <View style={styles.socialButtonContainer}>
                    <View style={styles.signupButtonLogoContainer}>
                        <Image source={Images.GOOGLE} style={styles.signupButtonLogo} />
                    </View>
                    <Text style={styles.socialSignupButtonText}>Kết nối với Google</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SignupScreen

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
        textAlign: 'center',
        flex: 1
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
    inputContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        justifyContent: 'center'
    },
    inputSubContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputText: {
        fontSize: 18,
        textAlignVertical: 'center',
        padding: 0,
        height: Display.setHeight(6),
        color: Colors.DEFAULT_BLACK,
        flex: 1
    },
    signupButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 8,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signupButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.POPPINS_MEDIUM
    },
    orText: {
        fontSize: 15,
        lineHeight: 15 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_MEDIUM,
        alignSelf: 'center',
        marginTop: 20
    },
    facebookButton: {
        backgroundColor: Colors.FABEBOOK_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    googleButton: {
        backgroundColor: Colors.GOOGLE_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupButtonLogo: {
        height: 18,
        width: 18
    },
    signupButtonLogoContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        padding: 2,
        borderRadius: 3,
        position: 'absolute',
        left: 25
    },
    socialButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    socialSignupButtonText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM
    },
    errorMessage: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        color: Colors.DEFAULT_RED,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginHorizontal: 20,
        marginTop: 5
    }
});
