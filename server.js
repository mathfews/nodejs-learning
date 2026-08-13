import http from 'node:http'
import path from "node:path"
import fs from "node:fs/promises"

const port = 8000

const __dirname = import.meta.dirname

const server = http.createServer( async (req, res) => {
    const publicPath = path.join(__dirname, "public")

    if (req.url === "/favicon.ico") {
        res.statusCode = 404
        res.end()
        return
    }

    const pathToResource = path.join(publicPath, req.url === "/" ? "index.html" : req.url)
    const content = await fs.readFile(pathToResource)
    res.end(content)
})

server.listen(port, () => console.log(`running on: ${port}`))