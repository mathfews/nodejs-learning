import http from 'node:http'
import path from "node:path"
import fs from "node:fs"

const port = 8000

const __dirname = import.meta.dirname

const filepath = path.join(__dirname, "public", "index.html")

const server = http.createServer((req, res) => {
    const content = fs.readFileSync(filepath, 'utf8')
    res.end(content)
})

server.listen(port, () => console.log(`running on: ${port}`))