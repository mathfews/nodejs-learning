import http from "node:http"
import { getDataFromDB } from "./scripts/db.js"

const port = 8000

function filterData(data, queryParams) {
  const { continent, is_open_to_public, country } = queryParams
  if (continent) {
    data = data.filter(entry => entry.continent.toLowerCase() == continent.toLowerCase())
  }
  if (is_open_to_public) {
    const isOpen = is_open_to_public.toLowerCase() == "true"

    data = data.filter(entry => entry.is_open_to_public == isOpen)
  }
  if (country) {
    data = data.filter(entry => entry.country.toLowerCase() == country.toLowerCase())
  }
  return data
}

const server = http.createServer( async (req, res) => {
  const data = await getDataFromDB()
  res.setHeader("Content-type", "application/json")
  
  const urlObj = new URL(req.url, `http://${req.headers.host}`)
  const queryParams = Object.fromEntries(urlObj.searchParams)

  if (urlObj.pathname == "/api" || req.url == "/api/") {
    if (Object.keys(queryParams).length == 0) {
      res.statusCode = 200
      res.end(JSON.stringify({message: data}))
    }
    else {
      res.statusCode = 200
      res.end(JSON.stringify({ "data": filterData(data, queryParams) }))
    }
  }
  
  else {
    res.statusCode = 404
    res.end(JSON.stringify({ message: "404 not found" }))
  }
})

server.listen(port, () => console.log(`running on: ${port}`))
