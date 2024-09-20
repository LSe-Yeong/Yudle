
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "http://ec2-54-252-10-146.ap-southeast-2.compute.amazonaws.com:8800",
      changeOrigin: true,
    })
  );
};