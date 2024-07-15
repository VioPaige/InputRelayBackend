const connectionManager = require(`../../lib/connectionManager.js`)

module.exports = {
    handler: (socket, data) => {
        let connection = connectionManager.connections[data.connectionCode]
        if (!connection) return

        connection.controller.emit(`iceCandidate`, data.candidate)
    }
}