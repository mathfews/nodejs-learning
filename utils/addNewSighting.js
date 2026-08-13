import fs from 'node:fs/promises'
import path from "node:path"
import { getData } from "./getData.js";
import { error } from 'node:console';

export async function addNewSighting(newSighting) {
    try {
        const __dirname = process.cwd()
        const pathToData = path.join(__dirname, "data", "data.json")
        const data = await getData()
        data.push(newSighting)
        await fs.writeFile(pathToData, JSON.stringify(data), "utf8")
/*
    1. Get the existing data (remember, this will already be a JS array)
    2. Push the new sighting to it
    3. Write data to the file.
    4. Add the new sighting and check out the 'read' page.
    5. Throw an error (in the catch block) if any of 1-3 above fail.
    
    To write data:
    Import fs/promises
    Use the writeFile method with the following:
      - the relative path to the file 
      - The data (what should we do to this data first?)
      - The encoding 'utf8'
    
    Bonus: figure out how to prettify the JSON!
    Remember to uncomment the import statement in routeHandler.js!!
*/
    } catch (err) {
        console.log(err)
    }

}