const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcryptjs")

//SignUp
router.post("/register", async (req, res) => {
    try {
       const{email, username, password} = req.body
       const hashpassword = bcrypt.hashSync(password)
       const user = new User({email, username, password: hashpassword});
       await user.save()
       .then(() => 
        res.status(200).json({ message: "Sign Up Successfull"})
       )
    } catch (error) {
       // console.log(error);
        res.status(200)
        .json({ message: "User already exits"})
        
    }
})

//SingIn
router.post("/signin", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      if(!user) {
        res.status(200)
        .json({ message: "Please SingUp"})
      }

      const IsPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
      if(!IsPasswordCorrect){
        res.status(200)
        .json({ message: "Invalide password"})
      }

      const {password,...others} = user._doc;
      res.status(200).json({user: others })


    } catch (error) {
      console.log(error);
        res.status(500)
        .json({ message: "User already exits"})
        
    }
})


module.exports = router