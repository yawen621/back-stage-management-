// module.exports = (config) => {
//     //在这里去做配置
//     return config
// }
// 高级配置#
// 我们现在已经把组件成功运行起来了，但是在实际开发过程中还有很多问题，例如上面的例子实际上加载了全部的 antd 组件的样式（对前端性能是个隐患）。

// 此时我们需要对 create-react-app 的默认配置进行自定义，这里我们使用 react-app-rewired （一个对 create-react-app 进行自定义配置的社区解决方案）。

// 引入 react-app-rewired 并修改 package.json 里的启动配置。由于新的 react-app-rewired@2.x 版本的关系，你还需要安装 customize-cra。

// 然后在项目根目录创建一个 config-overrides.js 用于修改默认配置。

// 使用 babel-plugin-import#
// babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件（原理），现在我们尝试安装它并修改 config-overrides.js 文件。

const { override, fixBabelImports, addLessLoader,addDecoratorsLegacy } = require('customize-cra');

const modifyVars=require('./lessVars')
module.exports = override(
  addDecoratorsLegacy(),
  // useBabelRc(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars
    // modifyVars: { '@primary-color': '#090' },
  }),
)

