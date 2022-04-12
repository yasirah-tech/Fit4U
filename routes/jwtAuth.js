const router = require("express").Router();
const pool = require("../db/db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../util/jwt_generator")
const validInfo = require("../middleware/validInfo")


//registering 

router.post("/register", validInfo, async(req,res) => {
    try {
      const {name, email, password} = req.body;
      const user = await pool.query("SELECT FROM users WHERE user_email = $1", [email]) 

      if(user.rows.length !== 0) {
          res.status(401).send("user already exists!")
      }
      else {
      const saltRounds = 10; 
      const salt = await bcrypt.genSalt(saltRounds);
      const bcryptPassword = await bcrypt.hash(password, salt)
      const newUser = await pool.query("INSERT INTO users (username, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword])

      const token = await jwtGenerator(newUser.rows[0].user_id)
      res.json({ token });
      }

    } catch (error) {
        res.status(500).send("server error")
    }
    
})

// sign-in 

router.post("/login", validInfo, async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])
        
        if(user.rows.length === 0) {
            return res.status(401).json("email or password is incorrect")
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)
        
        if(!validPassword) {
            res.status(401).json("email or password is incorrect")
        }

        const token = await jwtGenerator(user.rows[0].user_id)
        res.json({ token })
    } catch (error) {
        
    }

})

module.exports = router; 