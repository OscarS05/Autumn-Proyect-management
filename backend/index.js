const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const routerApi = require('./routes/index');
const { config } = require('./config/config');

const port = config.port || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

const whitelist = ['http://localhost:8000'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null, true);
    } else {
      callback(new Error("No permitido"));
    }
  }
}
app.use(cors(options));

require('./utils/auth');
require('./utils/cron');

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);
