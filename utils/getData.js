import path from 'node:path'
import fs from 'node:fs/promises'

const __dirname = process.cwd()

export async function getData() {
    const pathToData = path.join(__dirname, "data", "data.json")
    try {
      const data = await fs.readFile(pathToData)
      return JSON.parse(data)
    }
    catch (error) {
      return []
    }
}