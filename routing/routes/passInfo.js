const connectionManager = require(`../../lib/connectionManager.js`)

module.exports = {
    handler: (socket, data) => {
        console.log(`passInfo ${data.connectionCode}`)

        let connection = connectionManager.connections[data.connectionCode]
        if (!connection) return

        // connection.controller?.emit(`passInfo`, data)
        connectionManager.waitingForInfo[data.connectionCode]?.emit(`passInfo`, data)
        connectionManager.waitingForInfo[data.connectionCode] = null
    }
}