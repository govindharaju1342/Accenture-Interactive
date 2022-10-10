import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as awsServerlessExpress from 'aws-serverless-express';
import routes from './routes';
const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Accept', '*/*');
  next();
});

app.use(morgan('combined'));
app.use(helmet());
app.use('/', routes); 

/** For lambda Development */ 
module.exports.handler = async (event:any, context:any) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const server = awsServerlessExpress.createServer(app);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
