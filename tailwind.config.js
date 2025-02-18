module.exports = {
  separator: "_",
  theme: {
    extend: {
      colors: {
        'brown': '#6E5F39',
        'light-brown': '#6E5F3950'
      },
      scale: {
        '200': '2',
        '300': '3'
      },
      aspectRatio: {
        wide: "16 / 7",
        "4x3": "4 / 3",
        "3x4": "3 / 4",
        "3x2": "3 / 2"
      },
      borderRadius: {
        xxl: "5rem",
      },
      blur: {
        xs: "1px",
      },
    },
    fontSize: {
      xs: ".75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.5rem",
      xxl: "2rem",
      xxxl: "2.5rem"
      // 'h1': ['51px', { lineHeight: '100%', letterSpacing: '-0.02em' }],
    },

    height: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      full: "100%",
      screen: "100vh",
      "1x2": "50%",
    }),
    width: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      "1x2": "50%",
      "1x3": "calc(100% * 1/3)", // 33.333333%',
      "2x3": "calc(100% * 2/3)", // 66.666667%',
      "1x4": "25%",
      "2x4": "50%",
      "3x4": "75%",
      "1x5": "20%",
      "2x5": "40%",
      "3x5": "60%",
      "4x5": "80%",
      "1x6": "calc(100% * 1/6)", // 16.666667%',
      "2x6": "calc(100% * 2/6)", // 33.333333%',
      "3x6": "50%",
      "4x6": "calc(100% * 4/6)", // 66.666667%',
      "5x6": "calc(100% * 5/6)", // 83.333333%',
      "1x12": "calc(100% * 1/12)", // 8.333333%',
      "2x12": "calc(100% * 2/12)", // 16.666667%',
      "3x12": "25%",
      "4x12": "calc(100% * 4/12)", // 33.333333%',
      "5x12": "calc(100% * 5/12)", // 41.666667%',
      "6x12": "50%",
      "7x12": "calc(100% * 7/12)", // 58.333333%',
      "8x12": "calc(100% * 8/12)", // 66.666667%',
      "9x12": "75%",
      "10x12": "calc(100% * 10/12)", // 83.333333%',
      "11x12": "calc(100% * 11/12)", // 91.666667%',
      full: "100%",
      screen: "100vw",
      grid_20: "calc(100% + 4rem)",
    }),
  },
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './slices/**/*.{js,ts,vue}',
    './App.{js,ts,vue}',
    './app.{js,ts,vue}',
    './Error.{js,ts,vue}',
    './error.{js,ts,vue}',
    './app.config.{js,ts}',
  ],
  // safelist: ['absolute', 'top-0', 'left-0'],  // Add problematic classes here
};
