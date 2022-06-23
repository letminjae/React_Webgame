const path = require('path');

module.exports = {
    name : 'wordrelay-setting',
    mode : 'development',
    devtool : 'eval', //빠르게하겠다
    resolve : {
        extensions: ['.jsx'], // entry에 확장자('./client.jsx')를 안써도 웹팩이 찾아서 entry에 넣어줌
    },
    
    entry: {
        app: ['./client'],
    }, // 입력을 한 후,

    module: {
        rules: [{
            test : /\.jsx?/, //jsx파일 전체를
            loader: 'babel-loader', // 바벨로더 적용시킨다
            options :{
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        }], //규칙 정하기
    }, // 모듈을 적용시키고,

    output : {
        path : path.join(__dirname, 'dist'),
        filename: 'app.js'
    }, // 출력한다
};