// handleGet

import { parse } from "node:path";
import { getData } from "../utils/getData.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { sendResponse } from "../utils/sendResponse.js";
import { addNewSighting } from "../utils/addNewSighting.js";
import { sightingEvents } from "../events/sightingEvents.js";

export async function handleGet(res) {
    const data = await getData()
    sendResponse(res, 200, "application/json", JSON.stringify(data))
    return
}

export async function handlePost(res, req) {
    try {
        const parsedBody = await parseJSONBody(req)
        await addNewSighting(parsedBody)
        sightingEvents.emit("sighting-added", parsedBody)
        sendResponse(res, 200, "application/json", JSON.stringify(parsedBody))
    }
    catch(err) {
        sendResponse(res, 400, "application/json", JSON.stringify({error: err}))
    }
}