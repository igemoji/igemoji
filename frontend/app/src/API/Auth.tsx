import { SERVER_API } from "@env";
import axios from "axios";
export const request = axios.create({
  baseURL: SERVER_API,
});

export const kakaoLoginAxios = async (code: string) => {
  const res = await request.get(`/oauth/kakao/${code}`);
  return res;
};

export const getMemberInfoAxios = async (memberId: number) => {
  const res = await request.get(`/member/${memberId}`);
  return res;
};

export const deleteMemberAxios = async (memberId: number) => {
  const res = await request.delete(`/member/${memberId}`);
  return res;
};

export const registNicknameAxios = async ({
  memberId,
  inputValue,
}: {
  memberId: number;
  inputValue: string;
}) => {
  const res = await request.put(`/member/nickname?memberId=${memberId}&nickname=${inputValue}`, {
    memberId,
    nickname: inputValue,
  });
  return res;
};
