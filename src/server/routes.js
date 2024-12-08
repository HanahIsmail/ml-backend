const { predictHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/predict',
        handler: predictHandler,
        options: {
            payload: {
                output: 'stream',
                parse: true,
                maxBytes: 1000000, // 1MB
                multipart: true,
            },
        },
    },
];

module.exports = routes;