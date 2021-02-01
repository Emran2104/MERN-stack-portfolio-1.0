const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        const token = req.header("auth-token")
        if (!token) {
            return res.status(400).json({msg: "Unauthorized token!"})
        }

        const verified = jwt.verify(token, process.env.JWT_SESSION_SECRET)
        if (!verified) {
            return res.status(401).json({msg: "Unauthorized token!"})
        }

        req.user = verified.id
        next()

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = auth 