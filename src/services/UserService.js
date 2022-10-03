import axios from 'axios';
import { ApiContants } from '../contants';
import { getToken } from '../Store';
import { authHeader } from '../utils/Generator';

const getUserData = async () => {
    console.log(`userService | getUserData`);
    try {
        let userResponse = await axios.get(
            `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/get-user`,
            { headers: authHeader(getToken()) },
        );
        if (userResponse?.status === 200) {
            return {
                status: true,
                message: 'Dữ liệu người dùng được tìm nạp',
                data: userResponse?.data,
            };
        } else {
            return {
                status: false,
                message: 'dữ liệu người dùng không được tìm thấy',
            };
        }
    } catch (error) {
        return {
            status: false,
            message: 'dữ liệu người dùng không được tìm thấy',
        };
    }
};

export default { getUserData };
