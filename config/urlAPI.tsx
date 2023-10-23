export const LOCAHOST = "http://192.168.40.104:3000"

export const API_BASE_URL = LOCAHOST + "/api";
export const API_BASE_URLS = LOCAHOST + "/api/timekeeping";
export const getApiUrl = (endpoint:any) => API_BASE_URL + endpoint;
export const getApiUrls = (endpoint:any) => API_BASE_URLS + endpoint;
export const getApiUrl_ByID = (endpoint:any, id: any) => API_BASE_URL + endpoint + id;
export const GET_TIME_WHERE_TIME = (endpoint:any, id: any) => API_BASE_URLS + endpoint + id;
export const GET_TIME_WHERE_ALL = (endpoint:any, id: any) => API_BASE_URLS + endpoint + id;

export const LOGIN = getApiUrl('/login');
export const SINGUP = getApiUrl('/sigup');
export const UPLOAD = getApiUrl('/upload');
export const UPLOAD_TIME = getApiUrls('/upload');
export const TIMEKEEPING_ON = getApiUrls('/timekeepingOn');
export const TIMEKEEPING_OFF = getApiUrls('/timekeepingOff');
export const GET_TIME_WHERE = getApiUrls('/getTimekeeping');

export const HANOI_MAP = {
    param: "250HQV_HANOI",
    IPv4 : "",
    address : "250 Hoàng Quốc Việt", 
    latitude: 21.046364535065223,
    longitude: 105.783499567687368,
}

export const HANOI_MAP_USER = {
    param: "HANOI_MAP_USER",
    IPv4 : "192.168.93.104",
    address : "Số 25 Ngõ 116 Miếu Đầm - Hà Nội", 
    latitude: 21.0044711,
    longitude: 105.7812882,
}

export const HAIPHONG_MAP = {
    param: "AH_HAIPHONG",
    IPv4 : "",
    address : "Phạm Dùng - An Hồng - An Dương - Hải Phòng", 
    latitude: 20.902375036412366,
    longitude: 106.61052912098457
}

//192.168.93.104
//172.16.0.171
//172.16.0.196
//172.16.0.204
//172.16.0.154