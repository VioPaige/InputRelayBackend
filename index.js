const http = require(`http`)
const fs = require(`fs`)
const path = require(`path`)
const { Server } = require(`socket.io`)

const { parseUrlFromRequest, parseCookiesFromRequest, parseRoomFromSocket, parseDataUriFromFile } = require(`./lib/parsing`)
const ioRouter = require(`./routing/iorouter.js`)

const PORT = 3003
const server = http.createServer((req, res) => {
    req.parsedUrl = parseUrlFromRequest(req)
    req.cookies = parseCookiesFromRequest(req)
})

const io = new Server(server, {
    allowEIO3: true,
    connectionStateRecovery: {
        maxDisconnectionDuration: `Infinity`
    },
    cors: {
        origin: `*`
    }
})

// debug setting
io.engine.on("connection_error", console.log)

console.log(`Listening for connections`)
io.on(`connection`, (socket) => {
    ioRouter(socket)
})

server.listen(PORT, () => console.log(`Listening on ${PORT}`))
