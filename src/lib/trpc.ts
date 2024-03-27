import {createTRPCClient, httpBatchLink} from '@trpc/client';
import type {AppRouter} from '../../server/trpcs';

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://192.168.1.10:3000/_api',
    }),
  ],
});
