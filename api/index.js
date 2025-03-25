const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./src/interfaces/middlewares/error.handler');

const routerApi = require('./src/interfaces/routes');
const { config } = require('./config/config');

const path = require('path');

const port = config.port || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

const whiteList = [config.frontUrl];
// app.options('*', cors());

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

const redis = require('./src/infrastructure/store/cache/index');
(async () => {
  try {
    await redis.set("test", "123", "EX", 10);
    const valor = await redis.get("test");
    console.log("Value stored in Redis:", valor);
  } catch (err) {
    console.error("Error in Redis:", err);
  }
})();

app.listen(port, () => {
  console.log(`Server run in PORT: ${port}`);
});
