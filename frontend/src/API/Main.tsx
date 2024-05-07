import { SERVER_API } from "@env";
import axios from "axios";
export const request = axios.create({
  baseURL: SERVER_API,
});

export const CreateRoomAxios = async ({
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
