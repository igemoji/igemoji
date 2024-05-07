import { SERVER_API } from "@env";
import axios from "axios";
export const request = axios.create({
  baseURL: SERVER_API,
});

export const kakaoLoginAxios = async (code: string) => {
  const res = await request.get(`/oauth/kakao/${code}`);
  return res;
};

export const registNicknameAxios = async ({
  memberId,
  inputValue,
}: {
  memberId: number;
  inputValue: string;
}) => {
  const res = await request.post(`/member/nickname?memberId=${memberId}&nickname=${inputValue}`, {
    memberId,
    nickname: inputValue,
  });
  return res;
};
