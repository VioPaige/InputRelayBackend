const fs = require(`fs`)

module.exports = {
    parseUrlFromRequest: (req) => {
        console.log(req.url)
        return new URL(req.url, `http://127.0.0.1:8080`)
    },
    parseCookiesFromRequest: (req) => {
        if (!req.rawHeaders.includes(`Cookie`)) return {}
        
        let cookies = {}
        for (let i of req.rawHeaders[req.rawHeaders.indexOf(`Cookie`) + 1].split(`; `)) cookies[i.split(`=`)[0]] = i.split(`=`)[1]

        return cookies
    },
    // parseRoomFromSocket: (rooms, socket) => {
    //     for (let room of rooms) if (room.includes(socket.id)) return room
    // },
    // parseDataUriFromFile: (file) => `data:image/png;base64,${fs.readFileSync(file).toString(`base64`)}`
}