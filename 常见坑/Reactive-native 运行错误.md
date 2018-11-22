Reactive-native 运行错误

1. 只能启动模拟器，无法安装app

   删除node_modules使用yarn

2. 安装app时出错找不到index.js

   将index.ios.js改成index.js

3. 安装并初始化成功undefined is not an object（evaluating 'Reactinternals.ReactCurrentOwner'）

   执行`yarn add react@16.0.0-alpha.12 `

4. Evaluating _reactNative.view.propTypes.style