import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";

import { ThemeContext } from "@/config/Theme";
import ModalBox from "@/components/ModalBox";

export default function HostWaiting() {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <View style={styles.hostWaiting}>
        {/* <ModalBox title="hostWaiting" onPress={null}>
          <Text>하이</Text>
        </ModalBox> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  hostWaiting: {
    width: "100%",
    // borderWidth: 1,
  },
});
