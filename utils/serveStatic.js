import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'
import { getData } from './getData.js'

export async function serveStatic(req, res, baseDir) {
  const urlObj = new URL(req.url, `http://${req.headers.host}`)

  const publicDir = path.join(baseDir, 'public')
  const filePath = path.join(
    publicDir,
    req.url === '/' ? 'index.html' : req.url
  )

  if (urlObj.pathname == "/api" || req.url == "/api/") {
    res.setHeader("Content-type", "application/json")
    res.end(JSON.stringify({data: await getData()}))
    return
  }

  const ext = path.extname(filePath)

  const contentType = getContentType(ext)

  try {
    const content = await fs.readFile(filePath)
    sendResponse(res, 200, contentType, content)

  } catch (err) {
    if (err.code === 'ENOENT') {
      const content = await fs.readFile(path.join(publicDir, '404.html'))
      sendResponse(res, 404, 'text/html', content)
    } else {
      sendResponse(res, 500, 'text/html', '<html><h1>Server Error: ${err.code}</h1></html>')
    }
  }

}
