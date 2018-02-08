/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');
const bodyParser = require('koa-bodyparser');
const db = require('../database/requests.js');

const app = new Koa();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());
app.use(bodyParser());

router.get('/', (ctx) => {
  ctx.body = 'Home';
});

const test = function(name) {
  return name;
};

const test2 = (name) => name;

router.get('/login/:username', async (ctx, next) => {
  try {
    const data = await db.getUser(ctx.params.username);
    await next();
    // axios.post(
    //   'http://localhost:3000/fakeMish/surgeRate/',
    //   {
    //     rider:
    //     {
    //       id: data[0].id,
    //       start: {
    //         longitude: data[0].start_longitude,
    //         latitude: data[0].start_latitude,
    //       },
    //       destination: {
    //         longitude: data[0].destination_longitude,
    //         latitude: data[0].destination_latitude,
    //       },
    //       Timestamp: new Date(),
    //     },
    //   },
    // )
    //   .then((response) => {
    //     console.log('response:', response.status);
    //     ctx.body(response);
    //   })
    //   .catch((err) => {
    //     console.error('error:', err.message);
    //   });
    ctx.body = JSON.stringify({
      rider:
      {
        id: data[0].id,
        username: data[0].username,
        start: {
          longitude: data[0].start_longitude,
          latitude: data[0].start_latitude,
        },
        destination: {
          longitude: data[0].destination_longitude,
          latitude: data[0].destination_latitude,
        },
        Timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error('err', error);
    ctx.body = 'Go forth and err no more';
  }
});

router.post('/matches', (ctx) => {
  ctx.body = 'Matches return here';
});

router.post(
  '/fakeMish/surgeRate', bodyParser(),
  async (ctx) => {
    try {
      // console.log(ctx.request.body);
      // => POST body
      // await next();
      // ctx.body = ctx.request.body;
      this.body = ctx.request.body;
      console.log('x', ctx.request.body);
    } catch (error) {
      console.error('err', error);
      ctx.body = 'Go forth and err no more';
    }
  },
  // .then((response) => {
  //   console.log('response:', response.status);
  //   ctx.body(response);
  // })
  // .catch((err) => {
  //   console.error('error:', err.message);
  // });
);

router.get('*', (ctx) => {
  ctx.body = 'broken';
});

app.listen(3000);