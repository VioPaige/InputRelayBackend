const connectionManager = require(`../../lib/connectionManager.js`)

module.exports = {
    handler: (socket, data) => {
        console.log(`getInfo ${data.connectionCode}`)

        let connection = connectionManager.connections[data.connectionCode]
        if (!connection) return

        connectionManager.waitingForInfo[data.connectionCode] = socket
        connection.controlled.emit(`getInfo`, {})
    }
}