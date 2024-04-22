import React from "react";

export const themes = {
  light: {
    kungya: "#FAFADD",
    kungyaYelloDark: "#B8B868",
    kungyaGreen: "#EFFADD",
    kungyaYello: "#FAFA8D",
    kungyaYelloLight: "#FAFAB5",
    white: "#FDFDFD",
    grey: "#C0C0C0",
    textBlack: "#47473F",
    black: "#000000",
    kungyaGreenAccent: "#A0E664",
    kungyaRed: "#FFDCE0",
    kungyaGreenAccent2: "#47A437",
  },
  dark: {
    kungya: "#1B1D24",
    kungyaYelloDark: "#848998",
    kungyaGreen: "#EFFADD",
    kungyaYello: "#595D6E",
    kungyaYelloLight: "#575C6D",
    white: "#FDFDFD",
    grey: "#C0C0C0",
    textBlack: "#FDFDFD",
    black: "#FDFDFD",
    kungyaGreenAccent: "#424754",
    kungyaRed: "#FFDCE0",
    kungyaGreenAccent2: "#47A437",
  },
};

export const ThemeContext = React.createContext({
  color: themes.light,
  toggleTheme: () => {},
});
