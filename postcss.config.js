import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // 添加 autoprefixer 插件
    "postcss-preset-env": postcssPresetEnv({
      stage: 0, // 允许使用所有阶段的 CSS 特性
      autoprefixer: { grid: true }, // 启用对 CSS Grid 的支持
      browsers: "last 2 versions, not dead, > 0.2%", // 目标浏览器配置
    }),
  },
};
