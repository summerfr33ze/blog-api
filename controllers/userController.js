const User = require("../models/user")
const passport = require("passport")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

exports.signup_post = (req,res) => {
    User.find({username: req.body.username}).exec().then(
      user => {
        if (user.length >= 1){
          return res.status(409).json(
            {
              message: "user exists"
            }
          )
        }
        else {
          bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
            if (err) {
              return next(err)
            }
            else {
            let adminStatus = false
            if(req.body.username === "summerfreeze"){
                adminStatus = true
            }
              const user = new User({
                username: req.body.username,
                password: hashedPassword,
                admin_status: adminStatus
              })
              const result = await user.save()
              res.json(user)
            }
          })
        }
      }
    )
    
}

exports.login_post = (req,res) => {
  User.find({username: req.body.username}).exec().then(
    user => {
      if (user.length < 1){
        return res.status(401).json({
          message: "auth failed"
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err,res) => {
        if (err) {
          return res.status(401).json({
            message: "auth failed"
        })
      }

      if (result) {
        const token = jwt.sign({
          username: user[0].username,
          user_id: user[0]._id
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        })
        return res.status(200).json({
          message: "auth successful",
          token: token
        })
      }

      res.status(401).json({
        message: "auth failed"
      })

      
    }
    )
  }
  )
  }