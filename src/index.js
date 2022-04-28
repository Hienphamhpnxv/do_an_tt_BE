import { connectDB, initialDB } from './config/mongoDB';
import express from 'express';
import { env } from './config/environments';
import { webRouter } from './routes';
import cors from 'cors';
import http from 'http';
import fileUpload from 'express-fileupload';

connectDB()
  .then(() => {
    console.log('connected db server');
    initialDB();
  })
  .then(() => {
    bootServer();
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });

const bootServer = () => {
  const app = express();
  // parse requests of content-type - application/json
  app.use(fileUpload());
  app.use(express.json({ limit: '50mb' }));
  app.use(cors());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // socket.io
  const server = http.createServer(app);

  server.listen(process.env.PORT || 8000, () => console.log('socket is running on port 8000'));

  // routes
  app.use('/api', webRouter);

  app.listen(env.APP_PORT, () => {
    console.log(`Server is running on port : ${env.APP_PORT}`);
  });

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
};

