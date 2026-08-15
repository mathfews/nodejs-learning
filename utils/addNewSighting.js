import fs from 'node:fs/promises'
import path from "node:path"
import { getData } from "./getData.js";
import { error } from 'node:console';
import { sanitizeData } from './sanitizeInput.js';

export async function addNewSighting(newSighting) {
    newSighting = sanitizeData(newSighting)
    try {
        const __dirname = process.cwd()
        const pathToData = path.join(__dirname, "data", "data.json")
        const data = await getData()
        data.push(newSighting)
        await fs.writeFile(pathToData, JSON.stringify(data), "utf8")
    } catch (err) {
        console.log(err)
    }
}