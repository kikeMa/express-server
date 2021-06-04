import morgan, { StreamOptions } from "morgan";
import Logger from "../domain/Logger";

export default class MorganLogger {

    static morganMiddleware(logger: Logger) {
        const stream: StreamOptions = {
            // Use the http severity
            write: (message: string) => logger.info(message),
        };
        return morgan("tiny", { stream })
    }

}