import http from "node:http"
import path from "node:path"
import { serveStatic } from "./utils/serveStatic.js"
import { getData } from "./utils/getData.js"

const port = 8000

const __dirname = import.meta.dirname

console.log(getData())

const server = http.createServer(async (req, res) => {
    await serveStatic(req, res, __dirname)
})

server.listen(port, () => console.log(`running on ${port}`))