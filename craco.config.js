module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
        "http": false,
          "https": false,
          "zlib": false,
          "stream": false,
          "crypto": false,
          "url": false,
          "assert": false,
          "util": false
        }
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
};