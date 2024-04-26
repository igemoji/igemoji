import React from "react";

export const themes = {
  light: {
    kungya: "#FAFADD",
    kungyaYelloDark: "#B8B868",
    kungyaGreen: "#EFFADD",
    kungyaYello: "#FAFA8D",
    kungyaYelloLight: "#FAFAB5",
    white: "#FDFDFD",
    grey: "#B0B0B0",
    text: "#47473F",
    black: "#000000",
    scoreGreen: "#1DD000",
    scoreRed: "#FF0000",
    kungyaGreenAccent: "#A0E664",
    kungyaRed: "#FFDCE0",
    kungyaRedDark: "#FF95A1",
    kungyaGreenAccent2: "#47A437",
    background: "rgba(255, 255, 255, 0)",
    gameBackground: "rgba(255,255,255,0.9)",
  },
  dark: {
    kungya: "#121212",
    kungyaYelloDark: "#757575",
    kungyaGreen: "#E0E0E0",
    kungyaYello: "#424242",
    kungyaYelloLight: "#2E2E2E",
    white: "#121212",
    grey: "#A0A0A0",
    text: "#ECECEC",
    black: "#FDFDFD",
    scoreGreen: "#24FF00",
    scoreRed: "#FFA1A1",
    kungyaGreenAccent: "#424754",
    kungyaRed: "#FFDCE0",
    kungyaRedDark: "#FF95A1",
    kungyaGreenAccent2: "#616161",
    background: "rgba(0, 0, 0, 0.7)",
    gameBackground: "rgba(0, 0, 0, 0.8)",
  },
};

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {},
});
