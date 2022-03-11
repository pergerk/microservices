module.exports = {
  id: 'default',
  distDir: 'dist/.ssr',
  viewsDir: 'gw/views',
  staticViews: [],
  webpack: (config /* webpack.Configuration */, env /* 'development' | 'production' */) => {
    return config;
  },
};
