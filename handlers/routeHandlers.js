// handleGet

import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";

/*
Challenge:
1. Export a function called handleGet(). 
2. It should:
   - use getData() to get the data
   - stringify that data
   - use sendResponse() to serve it
   
Open the browser and load the sightings page to see if it works.
*/

export async function handleGet(res) {
    const data = await getData()
    sendResponse(res, 200, "application/json", JSON.stringify(data))
    return
}

// handlePost