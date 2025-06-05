import pino from "pino";
import pinoCaller from "pino-caller";

let logger: pino.Logger;

const createLogger = () => {
    if (!logger) {
        logger = pinoCaller(
            pino({
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                        ignore: 'pid,hostname,caller',
                        messageFormat: `{msg} (at {caller}) ${
                            process.env.CUCUMBER_WORKER_ID ? `${process.env.CUCUMBER_WORKER_ID}` : ''
                        }`
                    }
                }
            })
        )
    }
 return logger;
};

logger = createLogger();

export default logger;