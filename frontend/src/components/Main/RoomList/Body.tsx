import React from "react";
import { ScrollView } from "react-native";

import RoomItem from "./RoomItem";

export default function Body() {
  const roomListInfo = [
    {
      roomNumber: 1,
      title: "초보만",
      state: "waiting",
      genre: "movie",
      isPublic: true,
      playerNumber: 4,
    },
    {
      roomNumber: 2,
      title: "드루와",
      state: "waiting",
      genre: "movie",
      isPublic: false,
      playerNumber: 3,
    },
    {
      roomNumber: 3,
      title: "다 들어와라 이 자식들아!!!!!",
      state: "gaming",
      genre: "movie",
      isPublic: true,
      playerNumber: 6,
    },
  ];
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      {/* roomListInfo 배열을 순회하며 각 RoomItem을 렌더링 */}
      {roomListInfo.map((roomInfo, index) => (
        <RoomItem
          key={index}
          roomNumber={roomInfo.roomNumber}
          title={roomInfo.title}
          state={roomInfo.state}
          genre={roomInfo.genre}
          isPublic={roomInfo.isPublic}
          playerNumber={roomInfo.playerNumber}
        />
      ))}
      {roomListInfo.map((roomInfo, index) => (
        <RoomItem
          key={index}
          roomNumber={roomInfo.roomNumber}
          title={roomInfo.title}
          state={roomInfo.state}
          genre={roomInfo.genre}
          isPublic={roomInfo.isPublic}
          playerNumber={roomInfo.playerNumber}
        />
      ))}
      {roomListInfo.map((roomInfo, index) => (
        <RoomItem
          key={index}
          roomNumber={roomInfo.roomNumber}
          title={roomInfo.title}
          state={roomInfo.state}
          genre={roomInfo.genre}
          isPublic={roomInfo.isPublic}
          playerNumber={roomInfo.playerNumber}
        />
      ))}
    </ScrollView>
  );
}
