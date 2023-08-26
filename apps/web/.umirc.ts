import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  proxy: {
    '/api': {
      target: 'http://localhost:3000/v1/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/v': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: { '^/v': '' },
    },
  },
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '双Token验证',
      path: '/doubleToken',
      component: './DoubleToken',
    },
    {
      name: '登录验证',
      path: '/captcha',
      component: './Captcha',
    },
    {
      name: '文件上传',
      path: '/upload',
      component: './TheUpload',
    },
    {
      name: '邮箱验证码',
      path: '/email',
      component: './Email',
    },
    {
      name: '图片压缩',
      path: '/compressImg',
      component: './CompressImg',
    },
  ],
  npmClient: 'pnpm',
});
