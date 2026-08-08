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
        res.write(country)
    }
    res.end()
})

server.listen(port, () => console.log(`running on: ${port}`))