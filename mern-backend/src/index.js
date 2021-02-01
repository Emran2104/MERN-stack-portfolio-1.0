var express = require("express")
var mongoose = require("mongoose")
var cors = require("cors")

// setup express 
var app = express()
app.use(express.json())
app.use(cors())


// starting up the server
var PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})


// getting .env
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

// setup mongoose & connecting to Mongo DB
mongoose.connect(
    process.env.MONGO_DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err) => {
        if (err) { throw err }
        console.log("Connected to Mongo DB!")
    }
)


// import routers
app.use("/user", require("./router/user/userRouter"))
app.use("/covid", require("./router/covid/covidRouter"))
app.use("/weather", require("./router/weather/weatherRouter"))
