const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  outputDir: 'health',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
})