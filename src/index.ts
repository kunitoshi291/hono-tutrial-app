import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono();

let blogPosts = [
  {
    id: "1",
    title: "Blog1",
    content: "Blog Posts",
  },
  {
    id: "2",
    title: "Blog2",
    content: "Blog2 Posts",
  },
  {
    id: "3",
    title: "Blog3",
    content: "Blog3 Posts",
  },

];

app.use("*", prettyJSON());
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/posts', (c) => c.json({posts: blogPosts}))

app.get('/posts/:id', (c) => {
  const id = c.req.param("id")
  const post = blogPosts.find((p) => p.id === id);
  if (post) {
    return c.json(post);
  }else {
    return c.json({message: "not found this page"} , 404);
  }
});
app.post("/posts", async(c) => {
  const { title, content } = await c.req.json<{title: string; content: string}>();
  const newPost ={ id: String(blogPosts.length + 1), title, content };
  blogPosts = [...blogPosts, newPost];
  return c.json(newPost, 201);
});



export default app
