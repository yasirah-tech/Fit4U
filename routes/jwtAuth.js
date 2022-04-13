const router = require("express").Router();
const pool = require("../db_pool")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../util/jwt_generator")
const validInfo = require("../middleware/validInfo")


//registering 

router.post("/register", validInfo, async(req,res) => {
    try {
      const {username, email, password} = req.body;
      const user = await pool.query("SELECT FROM users WHERE email = $1", [email]) 

      if(user.rows.length !== 0) {
          res.status(401).send("user already exists!")
      }
      else {
      const saltRounds = 10; 
      const salt = await bcrypt.genSalt(saltRounds);
      const bcryptPassword = await bcrypt.hash(password, salt)
      const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, bcryptPassword])

      const token = await jwtGenerator(newUser.rows[0].user_id)
      return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }).status(200).json("Registered successfully")
      }

    } catch (error) {
        console.error(error)
        res.status(500).send("server error")
    }
    
})

// sign-in 

router.post("/login", validInfo, async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if(user.rows.length === 0) {
            return res.status(401).json("email or password is incorrect")
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if(!validPassword) {
            res.status(401).json("email or password is incorrect")
        }

        const token = await jwtGenerator(user.rows[0].id)
        return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        }).status(200).json("Logged in successfully")
        
    } catch (error) {
        
    }

})

module.exports = router; 