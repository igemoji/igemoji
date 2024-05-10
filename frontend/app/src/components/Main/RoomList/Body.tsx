import React, { useEffect, useState } from "react";
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";

import RoomItem from "./Contents/RoomItem";

import { getRoomListAxios } from "@/API/Main";

interface RoomInfo {
  roomId: number;
  title: string;
  isPublic: boolean;
  isProgress: boolean;
  memberNum: number;
}

export default function Body() {
  const [roomListInfo, setRoomListInfo] = useState<RoomInfo[]>([]);
  const [pageNum, setPageNum] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const getRoomList = async () => {
      try {
        const { data } = await getRoomListAxios(pageNum);
        setRoomListInfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    getRoomList();
  }, []);

  const fetchRoomList = async () => {
    try {
      setIsFetching(true);
      const { data } = await getRoomListAxios(pageNum + 1);
      setRoomListInfo((prevList) => [...prevList, ...data]);
      setPageNum((prevPageNum) => prevPageNum + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 50;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      if (!isFetching) {
        fetchRoomList();
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}>
      {roomListInfo.map((roomInfo, index) => (
        <RoomItem
          key={index}
          roomId={roomInfo.roomId}
          title={roomInfo.title}
          isPublic={roomInfo.isPublic}
          isProgress={roomInfo.isProgress}
          memberNum={roomInfo.memberNum}
        />
      ))}
    </ScrollView>
  );
}
