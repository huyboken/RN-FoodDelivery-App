import axios from 'axios';
import { ApiContants } from '../contants';
import { getToken } from '../Store';
import { authHeader } from '../utils/Generator';

const getRestaurants = async () => {
    console.log(`restaurantService | getRestaurents`);
    try {
        let restaurantResponse = await axios.get(
            `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.RESTAURANT}`,
            { headers: authHeader(getToken()) },
        );
        if (restaurantResponse?.status === 200) {
            return {
                status: true,
                message: 'Dữ liệu nhà hàng được tìm nạp',
                data: restaurantResponse?.data?.data,
            };
        } else {
            return {
                status: false,
                message: 'Dữ liệu nhà hàng không được tìm thấy',
            };
        }
    } catch (error) {
        return {
            status: false,
            message: 'Dữ liệu nhà hàng không được tìm thấy',
        };
    }
};


const getOneRestaurantById = async (restaurantId) => {
    console.log(`restaurantService | getOneRestaurantById`);
    try {
        let restaurantResponse = await axios.get(
            `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.RESTAURANT}/${restaurantId}`,
            { headers: authHeader(getToken()) },
        );
        if (restaurantResponse?.status === 200) {
            return {
                status: true,
                message: 'Dữ liệu nhà hàng được tìm nạp',
                data: restaurantResponse?.data?.data,
            };
        } else {
            return {
                status: false,
                message: 'Dữ liệu nhà hàng không được tìm thấy',
            };
        }
    } catch (error) {
        return {
            status: false,
            message: 'Dữ liệu nhà hàng không được tìm thấy',
        };
    }
};
export default { getRestaurants, getOneRestaurantById };
