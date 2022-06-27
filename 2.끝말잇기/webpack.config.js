const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "wordrelay-setting",
  mode: "development",
  devtool: "eval", //빠르게하겠다
  resolve: {
    extensions: [".js", ".jsx"], // entry에 확장자('./client.jsx')를 안써도 웹팩이 찾아서 entry에 넣어줌
  },

  entry: {
    app: ["./client"],
  }, // 입력을 한 후,

  module: {
    rules: [
      {
        test: /\.jsx?/, //jsx파일 전체를
        loader: "babel-loader", // 바벨로더 적용시킨다
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 5% in KR", "last 2 chrome versions"], // 지원하고자하는 브라우저
                },
                debug: true, //디버깅 허용
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-refresh/babel"],
        },
      },
    ], //규칙 정하기
  }, // 모듈을 적용시키고,
  plugins: [new RefreshWebpackPlugin()],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist/",
  }, // 출력한다
  devServer: {
    devMiddleware: { publicPath: "/dist/" },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};
