const express = require('express');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const routerApi = require('./routes/index');
const { config } = require('./config/config');

const port = config.port || 3000;
const app = express();

app.use(express.json());

const whiteList = ['http://localhost:8000'];
app.options('*', cors());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

require('./utils/auth');
require('./utils/cron');

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
