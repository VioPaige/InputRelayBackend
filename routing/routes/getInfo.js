const connectionManager = require(`../../lib/connectionManager.js`)

module.exports = {
    handler: (socket, data) => {
        let connection = connectionManager.connections[data.connectionCode]
        if (!connection) return

        connectionManager.waitingForInfo[data.connectionCode] = socket
        connection.controlled.emit(`getInfo`, {})
    }
}