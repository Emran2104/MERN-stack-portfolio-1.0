var express = require("express")
var router = express.Router()
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")

var User = require("../../models/userModel")
var auth = require("../../middleware/auth")

router.post("/update", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user)
        let body = req.body
        if (body.email || body.email !== "") {
            const email = body.email
            user.email = email
        }
        else {
            user.email = user.email
        }
        if (body.firstname || body.firstname !== "") {
            const firstname = body.firstname
            user.firstname = firstname
        }
        else {
            user.firstname = user.firstname
        }
        if (body.lastname || body.lastname !== "") {
            const lastname = body.lastname
            user.lastname = lastname
        }
        else {
            user.lastname = user.lastname
        }
        if (body.birthday || body.birthday !== "") {
            let birthday = body.birthday
            birthday = birthday.slice(0, 10)
            user.birthday = birthday
        }
        else {
            user.birthday = user.birthday
        }

        user.save()
        res.json(body)

    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}) 

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user)
        res.json({
            email: user.email,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            birthday: user.birthday
        })
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})


router.post("/register", async (req, res) => {
    try {
        const {email, password, passwordCheck, username} = req.body
        if (!email || !password || !passwordCheck || !username) {
            return res.status(400).json({msg: "Fill in all the requirements!"})
        }

        if (password.length < 5) {
            return res.status(400).json({msg: "Fill in a strong password, >5 characters!"})
        }
        if (password !== passwordCheck) {
            return res.status(400).json({msg: "Passwords do not match!"})
        }
        if (username.length > 20) {
            return res.status(400).json({msg: "Username length can not exceed 20 characters!"})
        }
        
        const excistingUser = await User.findOne({email: email})
        if (excistingUser) {
            return res.status(400).json({msg: "User with this email already exist!"})
        }

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = new User({
            email,
            password: passwordHash,
            username
        })
        const savedUser = await newUser.save()
        res.json(savedUser)

    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})


router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({msg: "Fill in both email and password!"})
        }

        const user = await User.findOne({email: email})
        if (!user) {
            return res.status(400).json({msg: "User does not excist!"})
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) {
            return res.status(400).json({msg: "Incorrect credential!"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SESSION_SECRET)
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})


router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user)
        res.json({deletedUser})

    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})

module.exports = router