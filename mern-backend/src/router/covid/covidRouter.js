var express = require("express")
var router = express.Router()
var request = require("request")
var fetch = require("node-fetch")

var Covid = require("./covidRequest")
const e = require("express")

router.get("/latestTotal", (req, res) => {
    Covid.url = "https://covid-19-data.p.rapidapi.com/totals"
    Covid.qs =  {format: 'json'}
  
    request(Covid, function (error, response, body) {
      try {
        
        let bodyParsed = JSON.parse(body)
  
        if (bodyParsed.message) {
          res.json({error: bodyParsed.message})
        }
        
        else {
          let confirmed = bodyParsed[0].confirmed
          let recovered = bodyParsed[0].recovered
          let critical = bodyParsed[0].critical
          let deaths = bodyParsed[0].deaths
          let lastUpdate = bodyParsed[0].lastUpdate
          lastUpdate = lastUpdate.replace("T", " ")
          lastUpdate = lastUpdate.slice(0, -6)
  
          res.json({
              confirmed: confirmed,
              recovered: recovered,
              critical: critical,
              deaths: deaths,
              lastUpdate: lastUpdate
          })
        }

      } catch (err) {
        res.status(500).json({error: err.message}) }
    })
  })


  router.get("/country/:code", (req, res) => {
    Covid.url = 'https://covid-19-data.p.rapidapi.com/country/code'
    Covid.qs = {code: req.params.code, format: 'json'}
    
    request(Covid, function (error, response, body) {
      try {
          let bodyParsed = JSON.parse(body) 
  
          if (bodyParsed.message) {
            res.json({error: bodyParsed.message})
          }

          else {
            let country = bodyParsed.map(e => e.country)
            let confirmed = bodyParsed.map(e => e.confirmed)
            let recovered = bodyParsed.map(e => e.recovered)
            let critical = bodyParsed.map(e => e.critical)
            let deaths =  bodyParsed.map(e => e.deaths)
          
            res.json({
                country: country,
                confirmed: confirmed,
                recovered: recovered,
                critical: critical,
                deaths: deaths,
            })
          }
      } catch (err) {
        res.status(500).json({
          error: err.message
        }) }
    })
  })

router.get("/continents", (req, res) => {
  fetch("https://disease.sh/v3/covid-19/continents")
  .then(res => res.json())
  .then( (json) => {
    res.json(json)
  })
})
  


module.exports = router