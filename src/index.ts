const createServer = (port: number = Number(process.env.PORT ?? '3000')) => {
    console.debug('Webserver starting');
    const server = Bun.serve({
        port,
        fetch: () => new Response("Welcome to Bun!"),
    });
    console.debug('Webserver started', { port });
    return server;
};

const main = async () => {
    console.info('Application starting');
    const server = createServer();
    console.info('Application started');
};

let exited = false;
['SIGINT', 'SIGKILL'].map(signal => process.on(signal, () => {
    // Only run once
    if (exited) return;
    exited = true;
    console.info('\nApplication stopping');
    console.info('Application stopped');
    process.exit();
}));

main().catch(error => {
    console.error('Application crashed', { cause: error });
});
