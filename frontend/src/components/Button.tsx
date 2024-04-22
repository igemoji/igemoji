import AwesomeButton from "react-native-really-awesome-button";

export default function Button({ name, children }: { name: string; children: string }) {
  return <AwesomeButton>{children}</AwesomeButton>;
}
