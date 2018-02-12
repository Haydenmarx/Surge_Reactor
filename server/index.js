/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

require('newrelic');

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
  let responseBody;
  let status = 404;
  try {
    const data = await db.getUser(ctx.params.username);
    const date = new Date();
    const hour = date.getHours();
    const hours = {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine',
      10: 'ten',
      11: 'eleven',
      12: 'twelve',
      13: 'thirteen',
      14: 'fourteen',
      15: 'fifteen',
      16: 'sixteen',
      17: 'seventeen',
      18: 'eighteen',
      19: 'nineteen',
      20: 'twenty',
      21: 'twentyone',
      22: 'twentytwo',
      23: 'twentythree',
      24: 'twentyfour',
    }
    await axios.post(
      'http://localhost:3000/fakeMish/surgeRate/',
      {
        rider:
        {
          id: data[0].id,
          start: {
            longitude: data[0].start_longitude,
            latitude: data[0].start_latitude,
          },
          destination: {
            longitude: data[0].destination_longitude,
            latitude: data[0].destination_latitude,
          },
          timestamp: date,
        },
      },
    )
      .then((response) => {
        if ((response.data.isSurged===false || response.data.isSurged === data[0][hours[hour]])) {
          responseBody = JSON.stringify({
            response: 'Thank you for choosing Surge Reactor',
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
              timestamp: date,
            },
          });
          status = 200;
          axios.post(
            'http://localhost:3000/fakeMish/matches/',
            {
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
                timestamp: date,
              },
            },
          )
        } else {
          responseBody = JSON.stringify({
            response: 'See you again soon!',
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
              timestamp: date,
            },
          });
          status = 200;
        }
      })
      .catch((err) => {
        console.error('error:', err.message);
      })
  } catch (error) {
    console.error('err here', error);
    ctx.response.status = 404;
    ctx.body = error;
  }
  await next();
  ctx.response.status = status;
  ctx.body = responseBody;
});

router.post('/matches', (ctx) => {
  ctx.body = 'Matches return here';
});

router.post(
  '/fakeMish/surgeRate', bodyParser(),
  async (ctx) => {
    let bool = Math.floor(Math.random() * 10 + 1) > 6;
    try {
      let rider = {
        id: ctx.request.body.rider.id,
        username: ctx.request.body.rider.username,
        isSurged: bool,
        surge_ratio: bool === true ? 1+(Math.floor(Math.random() * 30 + 1)/10) : 1,
      };
      ctx.response.status = 200;
      ctx.response.body = rider;
    } catch (error) {
      ctx.response.status = 404;
      ctx.response.body = error;
    }
  },
);

router.post(
  '/fakeMish/matches', bodyParser(),
  async (ctx) => {
    try {
      ctx.response.status = 200;
      ctx.response.body = ctx.request.body;
    } catch (error) {
      ctx.response.status = 404;
      ctx.response.body = error;
    }
  },
);

router.get('*', (ctx) => {
  ctx.body = '404';
});

app.listen(3000);