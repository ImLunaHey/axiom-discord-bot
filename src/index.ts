import { Logger } from './logger';

const createWebserver = (logger: Logger, port: number = Number(process.env.PORT ?? '3000')) => {
    logger.debug('Starting');
    const server = Bun.serve({
        port,
        fetch: () => new Response("Welcome to Bun!"),
    });
    logger.debug('Started', { port });
    return server;
};

const createDiscordBot = (logger: Logger) => {
    // TODO: Create discord.js bot
};

const logger = new Logger({ service: 'app' });
const webserverLogger = new Logger({ service: 'web' });
const discordBotLogger = new Logger({ service: 'bot' });

try {
    // Starting application
    logger.info('Starting');

    // Create webserver
    createWebserver(webserverLogger);

    // Create discord bot
    createDiscordBot(discordBotLogger);

    // Application has started
    logger.info('Started');

    let exited = false;
    ['SIGINT', 'SIGKILL', 'SIGTERM'].map(signal => process.on(signal, () => {
        // Only run once
        if (exited) return;
        exited = true;
        logger.info('\nStopping');
        logger.info('Stopped');
        process.exit();
    }));
} catch (error: unknown) {
    logger.error('Crashed', { error });
}
