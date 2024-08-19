import { get } from '@/utils/request';

export const apiGetHomeBanner = (params) => get('/api/bizhi/homeBanner', params);
export const apiGetWallNewsList = (params) => get('/api/bizhi/wallNewsList', params);
export const apiGetRandomWall = (params) => get('/api/bizhi/randomWall', params);
export const apiGetClassify = (params) => get('/api/bizhi/classify', params);
export const apiSetRate = (params) => get('/api/bizhi/setupScore', params);
export const apiDownloadWall = (params) => get('/api/bizhi/downloadWall', params);
export const apiGetUserInfo = (params) => get('/api/bizhi/userInfo', params);
export const apiGetClassifyDetail = (params) => get('/api/bizhi/wallList', params);
