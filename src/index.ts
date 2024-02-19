import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json';
import posts from "./blogs/blogs"
import auth from "./auth/auth";
import { basicAuth as basicAuthMiddleware } from 'hono/basic-auth'


const app = new Hono();

app.use("*", prettyJSON());

app.use(
  '/auth/*',
  basicAuthMiddleware({
    username: 'toshi',
    password: 'toshi',
  })
)

app.route("/posts", posts);
app.route("/auth", auth);


app.get('/', (c) => {
  return c.text('!')
});

export default app
function basicAuth(arg0: { username: string; password: string; }): import("hono").MiddlewareHandler<import("hono").Env, "/auth/*", {}> {
  throw new Error('Function not implemented.');
}

