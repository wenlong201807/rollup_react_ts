import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import html from '@rollup/plugin-html';
import scss from 'rollup-plugin-scss';
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import url from '@rollup/plugin-url';
import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';
const extensions = ['.js', '.ts', '.tsx', '.json'];
// 一段自定义的内容，以下内容会添加到打包结果中
const footer = `
if(typeof window !== 'undefined') {
  window._Dry_VERSION_ = '${pkg.version}'
}`

export default {
  input: 'src/index.tsx',
  output: {
    file: 'lib/index.js', 
    format: 'cjs',
    sourcemap: !isProd,
  },
  // output: [// 链接：https://juejin.cn/post/6950557086916804645
  //   {
  //     file: pkg.main,
  //     format: 'cjs',
  //     footer,
  //   },
  //   {
  //     file: pkg.module,
  //     format: 'esm',
  //     footer,
  //   },
  //   {
  //     file: pkg.browser,
  //     format: 'umd',
  //     name: 'Dry',
  //     footer,
  //   },
  // ],
  plugins: [
    replace({// 通常，@rollup/plugin-replace应该放在其他插件plugins 之前，以便它们可以应用优化，例如删除死代码。
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),// JSON.stringify安全地预处理目标字符串
      preventAssignment: true,
    }),
    // postcss({
    //   // modules: {},
    //   extract: true,
    //   // namedExports: true
    // }),
    url(),
    resolve({
      extensions,
    }),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      extensions,
      exclude: /node_modules/,
      babelrc: false,
      babelHelpers: 'runtime',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [
        // This plugin should be defined before transform-es2015-modules-commonjs plugin because it's using ES2015 modules syntax to import React into scope. 
        // https://www.npmjs.com/package/babel-plugin-react-require
        'react-require',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        ['@babel/plugin-proposal-object-rest-spread', {
          useBuiltIns: true,
        }],
        ['@babel/plugin-transform-runtime', {
          corejs: 3,
          helpers: true,
          regenerator: true,
          useESModules: false,
        }],
      ],
    }),
    html({
      fileName: 'index.html',
      title: 'test66',
      template: ({ title }) => {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <div id="app"></div>
  <script src="index.js"></script>
</body>
</html>
`;
      },
    }),
    scss({
      // processor: () => postcss([autoprefixer()]),
      output: 'lib/index.css',
      // sass: require('node-sass'),
    }),
    (isProd && terser()),
    (!isProd && serve({
      host: 'localhost',
      port: 3002,
      open: true,
      contentBase: ['lib'],
      // https: {
      //   key: fs.readFileSync('/path/to/server.key'),
      //   cert: fs.readFileSync('/path/to/server.crt'),
      //   ca: fs.readFileSync('/path/to/ca.pem')
      // },
      //set headers
      // headers: {// 解决跨域
      //   'Access-Control-Allow-Origin': '*',
      //   foo: 'bar'
      // },
      // execute function after server has begun listening
      // onListening: function (server) {
      //   const address = server.getAddress()
      //   const host = address.host === '::' ? 'localhost' : address.host
      //   // by using a bound function, we can access options as `this`
      //   const protocol = this.https ? 'https' : 'http'
      //   console.log(`Server listening at ${protocol}://${host}:${address.port}/`)
      // }
    })),
    (!isProd && livereload({
      watch: 'lib',
      // https: {
      //   key: fs.readFileSync('keys/agent2-key.pem'),
      //   cert: fs.readFileSync('keys/agent2-cert.pem')
      // }
    })),
  ],
};
