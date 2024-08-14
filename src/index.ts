import { Hono } from 'hono';

const app = new Hono<{
  readonly Bindings: {
    readonly SHORT_URLS: KVNamespace<string>;
  };
}>();

const validPath = (path: string | null | undefined): path is string => {
  return path != null && path !== '' && (/^[A-Za-z0-9]+$/).test(path);
};

const validUrl = (url: string | null | undefined): url is string => {
  return url != null && url !== '' && (url.startsWith('https://') || url.startsWith('http://'));
};

app.get('/', async (c) => {
  return c.redirect('https://taiy.me/', 307);
});

app.get('/:path', async (c) => {
  const { path } = c.req.param();
  if (!validPath(path)) return c.notFound();

  const url = await c.env.SHORT_URLS.get(path, 'text');
  if (!validUrl(url)) return c.notFound();

  return c.redirect(url, 307);
});

export default app;
