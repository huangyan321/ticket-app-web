/** @format */

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
// @ts-ignore
import cors from '@koa/cors';
import koaStatic from 'koa-static';
import { catchError } from '@/middleware/error';
import initManager from './core/init';

const app = new Koa();
app.use(bodyParser());
app.use(cors());
app.use(koaStatic(__dirname + '/public'));
app.use(catchError);
initManager.initCore(app);
app.listen(4455, () => {
  console.log('Koa is listening in http://localhost:4455');
});
