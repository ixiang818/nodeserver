import * as Router from 'koa-router';
import createRoutes from '../utils/create-routes';
import { randomString } from '../utils/random';
import { query } from '../utils/mysql'
// 引入生成路由的json数据
const routes = require('../../data/routes.json');
const router = new Router({
    prefix: routes.baseRoute ? `/${routes.baseRoute}` : '',
});

//登录（√）
router.post('/login', async (ctx) => {
    var response;
    //@ts-ignore
    var username = ctx.request.body.username;
    //@ts-ignore
    var password = ctx.request.body.password;
    var isSearch = false;

    let loginsql = "select * from users where username='" + username + "'";
    let result = await query(loginsql, null)

    //@ts-ignore
    if (result.length != 0) {
        //@ts-ignore
        if (result[0].password == password) {
            isSearch = true;
        }
    }

    if (isSearch) {
        response = {
            success: true,
            data: {
                userToken: randomString(),
            },
        };
    } else {
        response = {
            success: false
        };
    }
    ctx.body = response;
});

//获取日记（√）
router.get('/getevents', async (ctx) => {
    let getsql = "select * from word_diary";
    let result = await query(getsql, null);
    var response = {
        success: true,
        data: result,
    };
    ctx.body = response;
});

//新增文字（√）
router.post('/createWord', async (ctx) => {
    //@ts-ignore
    console.log(ctx.request.body)
    //@ts-ignore
    var params = ctx.request.body
    let result = await query(`INSERT INTO word_diary SET ?`, [params]);
    console.log(result);
    var response = {
        success: true,
        message: 'add success'
    };
    ctx.body = response;
});

//删除日记(√)
router.post('/deleteWord', async (ctx) => {
    //@ts-ignore
    console.log(ctx.request.body)
    //@ts-ignore
    var id = ctx.request.body.id;
    let deletsql = "delete from word_diary where id="+id;
    let result = await query(deletsql, null);
    console.log(result)
    var response = {
        success: true,
        message: 'delete success'
    };
    ctx.body = response;
});

//查找日记(√)
router.post('/search', async (ctx) => {
    //@ts-ignore
    console.log(ctx.request.body)
    //@ts-ignore
    var searchQuery = ctx.request.body.searchQuery
    let searchsql = "select * from word_diary where text like '%" + searchQuery + "%'"
    let result = await query(searchsql, null);
    var response = {
        success: true,
        data: result
    };
    ctx.body = response;
});

//获取相片(√)
router.get('/getPhotos', async (ctx) => {
    let getsql = "select * from picture_diary";
    let result = await query(getsql, null);
    var response = {
        success: true,
        data: result,
    };
    ctx.body = response;
});

//新增相片(√)
router.post('/createPhotos', async (ctx) => {
    //@ts-ignore
    console.log(ctx.request.body)
    //@ts-ignore
    var params = ctx.request.body
    let result = await query(`INSERT INTO picture_diary SET ?`, [params]);
    console.log(result);
    var response = {
        success: true,
        message: 'add success'
    };
    ctx.body = response;
});

createRoutes(router, routes);

export default router;
