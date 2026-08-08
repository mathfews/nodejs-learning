import http from "node:http"
import {getDataFromDB} from "./scripts/db.js";

const port = 8000

const server = http.createServer( async (req, res) => {
    const data = await getDataFromDB()
    if ((req.url) === "/api/") {
        res.write(JSON.stringify(data))
    }
    else if ( (req.url).includes("/api/country/") ) {
        const country = req.url.split("/")[3].toLowerCase()
        const selected_country_data = data.filter(element => element.country.toLowerCase() === country)
        if (selected_country_data.length === 0) {
            res.write(`404 - The country, ${country}, was not found.`)
        }
        else {
            selected_country_data.forEach((place) => {
                res.write(`- Name: ${place.name} \n`)
                res.write(`- Location: ${place.location} \n`)
                res.write(`- Continent: ${place.continent} \n`)
                res.write(`- Open to public: ${place.is_open_to_public ? "Yes" : "No"} \n`)
                res.write("\n")
            })
        }
    }
    res.end()
})

server.listen(port, () => console.log(`running on: ${port}`))