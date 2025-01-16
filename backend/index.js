const express = require('express');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const routerApi = require('./routes/index');
const { config } = require('./config/config');

const path = require('path');

const port = config.port || 3000;
const app = express();

app.use(express.json());

const whiteList = [config.frontUrl];
// app.options('*', cors());
console.log('whiteList', whiteList);

app.use(cors({
  origin: whiteList,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

require('./utils/auth');
require('./utils/cron');

routerApi(app);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/', (req, res) => {
  res.redirect('/sign-in');
});

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use((err, req, res, next) => {
  if (err instanceof Error && err.message === 'Not authorized by CORS') {
    return res.status(403).json({ message: 'Domain not allowed by CORS' });
  }
  next(err);
});

app.listen(port, () => {
  console.log(`Server run in PORT: ${port}`);
});
