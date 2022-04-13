const router = require("express").Router();
const pool = require("../db_pool")
const authorization = require("../middleware/authorization")

router.get("/", authorization, async(req, res) => {
    try {
        // res.json(req.user)
        // console.log(req.user)
        // console.log("hit")
        // console.log(req.user)
        const user = await pool.query("SELECT username, email FROM users WHERE id = $1",[req.user])
        res.json(user.rows[0])
        
    } catch (error) {
        
    }
})

module.exports = router; 