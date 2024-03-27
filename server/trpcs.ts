import {initTRPC} from '@trpc/server';
import {z} from 'zod';
import {findSong, getSongsByIds} from './lib/db/find';

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;
export const appRouter = router({
  getData: publicProcedure.query(async () => {
    return 'end';
  }),
  search: publicProcedure
    .input(z.object({keyWord: z.string(), type: z.number()}))
    .query(async opt => {
      return findSong(opt.input.keyWord, opt.input.type);
    }),
  getSheet: publicProcedure.input(z.array(z.string())).query(async opt => {
    const ids = opt.input;
    return getSongsByIds(ids); 
  }),
});

export type AppRouter = typeof appRouter;
