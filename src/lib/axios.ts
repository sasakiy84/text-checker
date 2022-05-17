import axios from 'axios';
import aspida from '@aspida/axios';
import api from 'api/$api';
const axiosConfig = {
  timeout: 3000,
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
};
/**
 * aspidaによって定義された型安全な通信を行えるオブジェクト
 * メソッドは、/src/apiで定義
 */
export const client = api(aspida(axios, axiosConfig));
