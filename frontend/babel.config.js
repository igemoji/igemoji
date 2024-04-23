module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
<<<<<<< HEAD
=======
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
>>>>>>> c0601b32f54267f9fb89e65232d4c24d93f64750
  };
};
