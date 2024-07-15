const http = require(`http`)
const fs = require(`fs`)
const path = require(`path`)
const { Server } = require(`socket.io`)
const wrtc = require(`wrtc`)

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
    
    // socket.on(`disconnect`, () => {})

    // let connection
    // socket.on(`offer`, async (offer) => {
    //     connection = new wrtc.RTCPeerConnection() // removed await here?

    //     connection.onicecandidate = (e) => {
    //         if (e.candidate) socket.emit(`iceCandidate`, JSON.stringify(e.candidate))
    //     }


    // })

    // socket.on(`offer`, (offer) => )
})

server.listen(PORT, () => console.log(`Listening on ${PORT}`))
