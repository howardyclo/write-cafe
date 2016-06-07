const path = require('path');
const cors = require('cors');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const isDev = process.env.NODE_ENV !== 'production';
const port = isDev ? 8080 : process.env.PORT;
const outputPath = path.resolve(__dirname, '../public');

const app = express();
const api = express.Router();

/**
 * API endpoint definition
 */
api.get('/test', (req, res) => {
    res.status(200).json({
        message: 'test success'
    });
});

app.use('/api', api);

/**
 * If DEV then use webpack-dev-server & HMR middleware.
 * Else start normal express server.
 */
if (isDev) {

    const config = require('../webpack.dev.config.js');
    const compiler = webpack(config);

    compiler.apply(new ProgressPlugin((percentage, msg) => {
        console.log(msg)
    }));

    const middleware = webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    // Start a webpack-dev-server
    app.use(middleware);
    // Enables HMR
    app.use(webpackHotMiddleware(compiler));
    // Serve index.html on any routes
    app.get('*', (req, res) => {
        res.write(middleware.fileSystem.readFileSync(path.join(outputPath, 'index.html')));
        res.end();
    });
}

else {
    app.use(express.static(outputPath));
    // Serve index.html on any routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(outputPath, 'index.html'));
    });
}

app.listen(port, (err) => {

    if (err)
        console.log(err);

    console.info('🌎 Listening on port %s', port);
});