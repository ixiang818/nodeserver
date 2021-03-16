import * as Koa from 'koa';
import * as KoaStatic from 'koa-static';
import * as path from 'path';
import config from './config';
import router from './router';

const app = new Koa();
const cors = require('koa-cors');
var fs = require("fs");
// 静态文件夹
app.use(KoaStatic(path.join(__dirname, '..', 'public')));
app.use(cors());

app.use(router.routes());

app.listen(config.port);
console.log(`app is started at port ${config.port}`);
