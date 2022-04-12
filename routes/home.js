const router = require("express").Router();
const pool = require("../db")
const authorization = require("../middleware/authorization")

router.get("/", authorization, async(req, res) => {
    try {
        // res.json(req.user)
        const user = await pool.query("SELECT username FROM users WHERE user_id = $1", [req.user]) 
        res.json(user.rows[0])
    } catch (error) {
        
    }
})

module.exports = router; 