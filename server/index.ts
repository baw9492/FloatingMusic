import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import {appRouter} from './trpcs';

const port = 3000;
const hostname = '192.168.1.10';
const app = express();

app.use(
  '/_api',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
);

app.get('/', async (_, res) => {
  // res.send(await findSong('ユメの喫茶店', 1));
});

app.listen(3000, () => {
  console.log(`server run on http://${hostname}:${port}`);
});
