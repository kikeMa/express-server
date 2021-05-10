import express from 'express';
import helmet from 'helmet';
const morgan = require("morgan");
import compress from 'compression';
import Router from 'express-promise-router';
import { registerRoutes } from './routes';
// import { registerSubscribers } from './subscribers';
import Logger from './shared/infrastructure/WinstonLogger';

const app: express.Express = express();

app.set('port', process.env.PORT || 3000);
const logger = new Logger();

const morganLogger = morgan({
    "format": "tiny",
    "stream": {
      write: function(str: any) { logger.info(str); }
    }
  }) 

app.use( morganLogger )
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(compress());

const router = Router();
app.use(router);
registerRoutes(router);
// registerSubscribers();

export default app;
