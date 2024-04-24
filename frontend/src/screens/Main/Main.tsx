import MainComponent from "@/components/Main/Main";
import { NavigationProps } from "@/types/types";

export default function Main({ navigation }: NavigationProps) {
  return (
    <>
      <MainComponent navigation={navigation} />
    </>
  );
}
