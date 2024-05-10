import { SERVER_API } from "@env";
import axios from "axios";
export const request = axios.create({
  baseURL: SERVER_API,
});

export const getRankListAxios = async (memberId: number) => {
  const res = await request.get(`/member/rank/${memberId}`);
  return res;
};
