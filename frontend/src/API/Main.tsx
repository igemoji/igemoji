import { SERVER_API } from "@env";
import axios from "axios";
export const request = axios.create({
  baseURL: SERVER_API,
});

export const createRoomAxios = async ({
  memberId,
  title,
  isPublic,
  password,
}: {
  memberId: number;
  title: string;
  isPublic: boolean;
  password: string;
}) => {
  const res = await request.post(`/room/create`, {
    memberId,
    title,
    isPublic,
    password,
    memberMaxNum: 6,
  });
  return res;
};

export const getRoomListAxios = async (pageNum: number) => {
  const res = await request.get(`/room/list?pageNum=${pageNum}`);
  return res;
};
