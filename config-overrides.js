const { override, fixBabelImports } = require('customize-cra')

const test = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  })
)

test.entry = './index.js'
test.output = {
  filename: '[name].js',
  chunkFilename: '[name].js', // 设置按需加载后的chunk名字
  publicPath: 'dist/', // 设置基础路径
}

module.exports = test
