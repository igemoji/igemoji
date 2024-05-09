module.exports = {
  resolve: {
    alias: {
      "react-native": "react-native-web",
      "react-native-webview": "react-native-web-webview",
    },
  },
};
const webViewConfig = {
  test: /postMock.html$/,
  use: {
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
    },
  },
};
