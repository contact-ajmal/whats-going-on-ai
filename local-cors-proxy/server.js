const cors_proxy = require('cors-anywhere');

// Listen on 0.0.0.0 to be accessible from outside the container
const host = '0.0.0.0';
const port = 8080;

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [], // Don't require specific headers
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function () {
    console.log('Running CORS AnyWhere on ' + host + ':' + port);
});
