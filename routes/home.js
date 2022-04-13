const router = require("express").Router();
const pool = require("../db_pool");
const authorization = require("../middleware/authorization");
const db = require("../db/db");

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
    .select("username", "email")
    .from("users")
    .where("id", req.user);
  const others = await db
    .select("username", "email")
    .from("users")
    .whereNot("id", req.user);
    console.log(others);
  res.render("../views/homepage.ejs", { user: data[0], others});
});

//log out need to figure out how to add to jwtAuth file but it works here
router.get("/logout", authorization, async (req, res) => {
    return res.clearCookie("access_token").redirect('/');
});

module.exports = router;