import axios from 'axios';
import { ApiContants } from '../contants';


const AuthRequest = axios.create({
    baseURL: ApiContants.BACKEND_API.BASE_API_URL,
});

const register = async (user) => {
    if (!user?.username || !user?.email || !user?.password) {
        return { status: false, message: "Vui lòng điền vào tất cả các trường" };
    }
    try {
        let requestBody = {
            username: user?.username,
            email: user?.email,
            password: user?.password,
        };

        let registerResponse = await AuthRequest.post(
            ApiContants.BACKEND_API.REGISTER,
            requestBody
        );
        console.log(registerResponse?.data);
        return registerResponse?.data
    } catch (error) {
        console.log(error);
        return { status: false, message: "Oops! Đã xảy ra sự cố" };
    }
};

const login = async (user) => {
    if (!user?.username || !user?.password) {
        return { status: false, message: "Vui lòng điền vào tất cả các trường" };
    }
    try {
        let requestBody = {
            username: user?.username,
            password: user?.password,
        };

        let loginResponse = await AuthRequest.post(
            ApiContants.BACKEND_API.LOGIN,
            requestBody
        );
        console.log(loginResponse?.data);
        return loginResponse?.data
    } catch (error) {
        console.log(error);
        return { status: false, message: "Oops! Đã xảy ra sự cố" };
    }
};

const checkUserExist = async (type, value) => {

    try {
        let params = { [type]: value }


        let userCheckResponse = await AuthRequest.get(
            ApiContants.BACKEND_API.USER_EXIST,
            { params }
        );
        console.log(userCheckResponse?.data);
        return userCheckResponse?.data
    } catch (error) {
        console.log(error);
        return { status: false, message: "Oops! Đã xảy ra sự cố" };
    }
};

export default { register, login, checkUserExist }