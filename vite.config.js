import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";

import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const env = loadEnv(mode, process.cwd());
  let isDev = env.VITE_USER_NODE_ENV == "development" ? true : false;
  return {
    base: isDev ? "/" : "./",

    // 插件
    plugins: [
      vue({
        reactivityTransform: true,
      }),
      // vueDevTools(),
    ],
    //
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      // 导入时想要省略的扩展名列表
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },

    // 运行服务的配置
    server: {
      host: "localhost", // 服务器地址 可设置为"0.0.0.0"
      port: Number(env.VITE_APP_PORT), // 端口号
      open: true, // 自动打开浏览器
      cors: true, // 跨域设置为 true
      strictPort: false, //  严格的端口号 true 时若端口已被占用则会直接退出, false 时端口占用后启动一个新的端口
      hmr: true, // 开启热更新
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          // rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
        },
      },
    },
    // css
    css: {
      devSourcemap: false, // 是否将 source map 文件输出到单独的文件夹中
      sourceMap: isDev ? true : false, // 开启 CSS source maps?
      preprocessorOptions: {
        sass: {
          // additionalData: `@import "@/styles/variables.less";` // 全局引入变量
        },
        less: {},
      },
    },
    // 打包配置
    build: {
      target: "es2015", // 设置最终构建的浏览器兼容目标
      outDir: "dist", // 指定构建输出目录，默认为 'dist'。
      assetsDir: "assets", // 指定静态资源的输出目录，默认为 'assets'。
      sourcemap: isDev ? true : false, // 构建后是否生成 source map 文件
      assetsInlineLimit: 4096, // 设置资源阈值，小于该值将内联为 base64 编码，避免额外的 http 请求
      chunkSizeWarningLimit: 2000, //  chunk 大小警告的限制（以 kb 为单位）
      reportCompressedSize: isDev ? false : true, // 启用/禁用 gzip 压缩大小报告
      emptyOutDir: true, // 是否清空 outputDir 在构建之前
      minify: "terser", // 混淆器，terser构建后文件体积更小 只需要安装不需要再此页面引入
      terserOptions: {
        // 压缩配置
        compress: {
          drop_console: true, // 生产环境移除console
          drop_debugger: true, // 生产环境移除debugger
        },
      },
      rollupOptions: {
        // rollup 打包配置
        output: {
          //  分包 把 大于 2000kb 的文件进行分包
          manualChunks(id) {
            // 分割代码
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
  };
});
