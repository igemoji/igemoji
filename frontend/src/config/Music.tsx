import { Audio } from "expo-av";
import * as React from "react";

export const MusicContext = React.createContext({
  isMusicOn: true,
  toggleMusic: () => {},
  sound: undefined as Audio.Sound | undefined,
  setSound: (sound: Audio.Sound | undefined) => {},
});
