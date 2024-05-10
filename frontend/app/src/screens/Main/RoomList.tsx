import RoomListComponent from "@/components/Main/RoomList";
import { NavigationProps } from "@/types/types";

export default function RoomList({ navigation }: NavigationProps) {
  return (
    <>
      <RoomListComponent navigation={navigation} />
    </>
  );
}
