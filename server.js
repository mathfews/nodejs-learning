import http from "node:http"
import {getDataFromDB} from "./scripts/db.js";

const port = 8000

const server = http.createServer( async (req, res) => {
    const data = await getDataFromDB()
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Content-type", "application/json")
    if ((req.url) === "/api/") {
        res.write(JSON.stringify(data))
    }
    else if ( (req.url).includes("/api/country/") ) {
        const country = req.url.split("/")[3].toLowerCase()
        const selected_country_data = data.filter(element => element.country.toLowerCase() === country)
        if (selected_country_data.length === 0) {
            res.end(JSON.stringify("404"))
        }
        else {
            res.end(JSON.stringify(selected_country_data))
        }
    }
    res.end()
})

server.listen(port, () => console.log(`running on: ${port}`))