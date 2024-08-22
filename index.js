const http = require(`http`)
const fs = require(`fs`)
const path = require(`path`)
const { Server } = require(`socket.io`)
const Turn = require(`node-turn`)

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

const turnServer = new Turn({
    authMech: `long-term`,
    credentials: {
        turnLTKSuite: `--53MxS9gA--`
    }
})

// debug setting
io.engine.on("connection_error", console.log)

console.log(`Listening for connections`)
io.on(`connection`, (socket) => {
    console.log(`connection`)
    ioRouter(socket)
})

server.listen(PORT, () => console.log(`Listening on ${PORT}`))
turnServer.start()
console.log(`Started turn server`)
