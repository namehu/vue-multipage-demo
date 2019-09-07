const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

const sassData = `
$env: ${process.env.NODE_ENV};
@import "@/scss/config.scss";
`;

const pages = {
  'index': {
    title: '首页', entry: 'src/pages/index/main.ts',
  },
  'home': {
    title: '主页', entry: 'src/pages/home/main.ts',
  },
};

module.exports = {
  publicPath: './',
  productionSourceMap: false, // 关闭生产环境的 source map
  devServer: {
    disableHostCheck: true,
  },
  pages,
  css: {
    loaderOptions: {
      sass: {
        data: sassData,
      }
    }
  },
  // The object will be merged into the final webpack config using webpack-merge.
  configureWebpack: {
    module: {
      rules: [{
        test: /\.html$/,
        oneOf: [
          {
            test: /\.render\.html$/,
            resourceQuery: /style=/,
            loader: 'vue-template-loader',
            options: {
              transformAssetUrls: {
                img: 'src'
              },
              scoped: true,
            },
          },
          {
            test: /\.render\.html$/,
            loader: 'vue-template-loader',
            options: {
              transformAssetUrls: {
                img: 'src'
              },
            },
          },
          {
            test: /\.functional\.html$/,
            loader: 'vue-template-loader',
            options: {
              functional: true,
            },
          },
          {
            loader: 'vue2-html-loader',
          }
        ],
        exclude: [resolve('public/index.html'), resolve('node_modules')]
      }]
    },
    plugins: [
      // 此次不可引用lodash插件。否则会导致antd部分功能失效
      // new LodashModuleReplacementPlugin({ shorthands: true }),
    ],
  },
  chainWebpack: config => {

    config.module
      .rule('scss')
      .oneOf('normal')
      .uses.clear()
      .end()
      .post()
      .enforce('post')
      .use('vue-style')
      .loader('vue-style-loader')
      .options({ sourceMap: false, shadowMode: false })
      .end()
      .use('css')
      .loader('css-loader')
      .options({ sourceMap: false, importLoaders: 2 });

    config.module
      .rule('css')
      .post()
      .enforce('post');

    config.module
      .rule('normal-scss')
      .test(/\.scss$/)
      .use('postcss')
      .loader('postcss-loader')
      .end()
      .use('sass')
      .loader('sass-loader')
      .options({ sourceMap: false, data: sassData })

    Object.keys(pages).forEach(k => {
      // 移除 prefetch 插件
      config.plugins.delete(`prefetch-${k}`);
      // 移除 preload 插件
      config.plugins.delete(`preload-${k}`);
    })
  }
}