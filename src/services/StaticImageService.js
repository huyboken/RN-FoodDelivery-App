import { ApiContants } from "../contants";

// const getFlagIcon = (
//     code = 'VN',
//     style = ApiContants.COUNTRY_FLAG.STYLE.FLAT,
//     size = ApiContants.COUNTRY_FLAG.SIZE[64]
// ) => `${ApiContants.COUNTRY_FLAG.BASE_URL}/${code}/${style}/${size}.png`;

const getFlagIcon = (
    code = 'VN'
) => `${ApiContants.COUNTRY_FLAG.BASE_URL}/${code}.png`;

export default { getFlagIcon };