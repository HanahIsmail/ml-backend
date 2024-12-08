const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const { initializeModel } = require('./handler');

const startServer = async () => {
    const server = Hapi.server({
        port: 4000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await initializeModel();
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

startServer().catch(console.error);
