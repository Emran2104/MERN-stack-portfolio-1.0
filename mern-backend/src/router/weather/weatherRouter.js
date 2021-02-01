var express = require("express")
var router = express.Router()
var fetch = require("node-fetch")

router.post("/current", (req, res) => {
    let {city} = req.body
    var weatherURL = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`
    
    fetch(weatherURL)
    .then(res => res.json())
    .then((data) => {
        return res.json({
            "location": {
                "country": data.location.country,
                "region": data.location.region
            },
            "current": {
                "last_updated": data.current.last_updated,
                "temp": data.current.temp_c,
                "condition": {
                    "text": data.current.condition.text,
                    "icon": data.current.condition.icon,
                },
                "wind_speed": data.current.wind_kph,
                "wind_dir": data.current.wind_dir,
                "precip": data.current.precip_mm,
                "humidity": data.current.humidity,
                "cloud": data.current.cloud,
                "feelslike": data.current.feelslike_c
            },
        })
    })
    .catch(error => {
        return res.status(500).json({error: error.message})
    }) 
  })

module.exports = router