import * as Koa from 'koa';
import * as KoaStatic from 'koa-static';
import * as path from 'path';
import config from './config';
import router from './router';

const app = new Koa();
const cors = require('koa-cors');
var fs = require("fs");
// 引入koa-bodyparser中间件，这个中间件可以将post请求的参数转为json格式返回
const bodyParser = require('koa-bodyparser');
// 使用中间件后，可以用ctx.request.body进行获取POST请求参数，中间件自动给我们解析为json
app.use(bodyParser());
// 静态文件夹
app.use(KoaStatic(path.join(__dirname, '..', 'public')));
app.use(cors());

app.use(router.routes());

app.listen(config.port);
console.log(`app is started at port ${config.port}`);