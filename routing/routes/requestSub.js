const connectionManager = require(`../../lib/connectionManager.js`)

module.exports = {
    handler: (socket, data) => {
        let key = connectionManager.awaitConnection(socket)
        socket.emit(`accessKey`, { key })
    }
}