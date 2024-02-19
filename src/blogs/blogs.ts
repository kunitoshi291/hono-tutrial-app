import { Hono } from 'hono'


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


app.get('/:id', (c) => {
    const id = c.req.param("id")
    const post = blogPosts.find((p) => p.id === id);
    if (post) {
      return c.json(post);
    }else {
      return c.json({message: "not found this page"} , 404);
    }
  });
  app.post("/", async(c) => {
    const { title, content } = await c.req.json<{title: string; content: string}>();
    const newPost ={ id: String(blogPosts.length + 1), title, content };
    blogPosts = [...blogPosts, newPost];
    return c.json(newPost, 201);
  });

  app.put("/:id", async(c) => {
    const id: string = c.req.param("id");
    const index = blogPosts.findIndex((p) => p.id === id);

    const {title, content} = await c.req.json();
    blogPosts[index] = {...blogPosts[index], title, content};

    if(index === -1) {
      return c.json({message: "Post not found"}, 404);
    }
    // console.log(blogPosts);
    return c.json(blogPosts[index]);
  });

  app.delete("/:id", async(c) => {
    const id: string = c.req.param("id");
    const index = blogPosts.findIndex((p) => p.id === id);

    if(index === -1) {
      return c.json({message: "Post not found"}, 404);
    }
   // 指定したid以外をそのまま残すフィルタリング
    blogPosts = blogPosts.filter((p) => p.id !== id);
    // console.log(blogPosts);
    return c.json({ message: "Blog post Deleted" });
  });

  app.get('/', (c) => c.json({posts: blogPosts}))

  export default app;

