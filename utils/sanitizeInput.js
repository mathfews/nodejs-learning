import sanitizeHtml from "sanitize-html"

export function sanitizeData(newSighting) {
    newSighting =  {
            "location": sanitizeHtml(newSighting.location, { allowedTags: ["b"], allowedAttributes: []}),
            "timeStamp": newSighting.timeStamp,
            "text": sanitizeHtml(newSighting.text, {allowedTags: ["b"], allowedAttributes: []}),
            "title": sanitizeHtml(newSighting.title, {allowedTags: ["b"], allowedAttributes: []})
    }
    return newSighting
}