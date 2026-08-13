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


    try {
        const content = await fs.readFile(pathToResource)
        res.end(content)
    }
    catch(error) {
        if (error.code == "ENOENT") {
            res.statusCode = 404
            const pathTo404 = path.join(publicPath, "404.html")
            const content = await fs.readFile(pathTo404)
            res.end(content)
        }
        else {
            res.statusCode = 500
            res.setHeader("Content-type", "text/html")
            res.end(`<html><h1>Server error: ${error.code}</h1></html>`)
        }
    }

})

server.listen(port, () => console.log(`running on: ${port}`))