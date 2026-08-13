import http, { get } from "node:http"
import path from "node:path"
import { serveStatic } from "./utils/serveStatic.js"
import { getData } from "./utils/getData.js"
import { handleGet, handlePost } from "./handlers/routeHandlers.js"

const port = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
        /*
    Challenge: 
    1. Add a route for a POST request to '/api'.
    2. When a request comes in, pass the req and res to handlePost().
    */  

    if (urlObj.pathname == "/api" || req.url == "/api/") {
        if (req.method === "GET") {
            return await handleGet(res)
        }
        else if (req.method === "POST") {
            return await handlePost(res, req)
        }
    }
    else {
        await serveStatic(req, res, __dirname)
    }
})

server.listen(port, () => console.log(`running on ${port}`))