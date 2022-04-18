const router = require("express").Router();
const pool = require("../db_pool");
const authorization = require("../middleware/authorization");
const db = require("../db/db");
const moment = require("moment");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT username, email FROM users WHERE id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (error) {}
});

//logs in
router.get("/home", authorization, async (req, res) => {
  const data = await db
    .select(
      "username",
      "email",
      "id",
      "first_name",
      "last_name",
      "bio",
      "location",
      "sports"
    )
    .from("users")
    .where("id", req.user);
  const others = await db
    .select("username", "email")
    .from("users")
    .whereNot("id", req.user);
  let posts = await db("posts")
    .select("posts.*", "users.first_name", "users.last_name")
    .from("posts")
    .join("users", { "users.id": "posts.user_id" })
    .orderBy("created_at", "desc")
    .limit(10);

  for (let i = 0; i < posts.length; i++) {
    const comments = await db
      .select("comments.content","comments.created_at","users.first_name", "users.last_name")
      .from("comments")
      .join("users", { "users.id": "comments.user_id" })
      .where(`post_id`, posts[i].postId)
      .orderBy("created_at", "desc")
      .limit(10)
      posts[i]['replies'] = comments;
  }
  res.render("../views/homepage.ejs", {
    user: data[0],
    posts: posts,
    moment: moment,
  });
});

//update user profile
router.put("/user/:id", authorization, async (req, res) => {
  const id = req.params.id;
  const {
    first_name: first_name,
    last_name: last_name,
    location: location,
    sports: sports,
    bio: bio,
  } = req.body;
  const changes = await db("users")
    .update({ first_name, last_name, location, sports, bio })
    .where({ id })
    .returning(["first_name", "last_name", "location", "sports", "bio"]);
  res.status(201).send(changes);
});

//user creates posts
router.post("/posts", authorization, async (req, res) => {
  const { content: content } = req.body;
  const postingUser = req.body.userId;
  const posting = await db("posts")
    .insert({ user_id: postingUser, content, likes: 0 })
    .returning(["user_id", "content"]);
  res.status(201).send(posting);
});

//user likes posts
router.put("/posts/likes/:id", authorization, async (req, res) => {
  const id = req.params.id;
  const liked = await db("posts").where({ postId: id }).increment("likes", 1);
  res.status(201).send("Success");
});

//user makes comments
router.post("/posts/comments", authorization, async (req, res) => {
  const { content: content, postId: postId } = req.body;
  const commentingUser = req.body.userId;
  const commenting = await db("comments")
    .insert({ content, user_id: commentingUser, post_id: postId })
    .returning(["content", "user_id", "post_id"]);
  res.status(201).send(commenting);
});

//log out need to figure out how to add to jwtAuth file but it works here
router.get("/logout", authorization, async (req, res) => {
  return res.clearCookie("access_token").redirect("/");
});

module.exports = router;
