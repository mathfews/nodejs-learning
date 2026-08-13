import http from "node:http"
import path from "node:path"
import { serveStatic } from "./utils/serveStatic.js"
import { getData } from "./utils/getData.js"
import { handleGet } from "./handlers/routeHandlers.js"

const port = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
    /*
        Challenge: 
        1. Set up a route for ‘/api’.
        2. Nest an if to check if the method is ‘GET’. 
        2. When a GET request is received to '/api', use handleGet() to handle it.
    */ 
   
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    
    if (urlObj.pathname == "/api" || req.url == "/api/" && req.method === "GET") {
        return await handleGet(res)
    }
    else {
        await serveStatic(req, res, __dirname)
    }
})

server.listen(port, () => console.log(`running on ${port}`))