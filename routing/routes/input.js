const connectionManager = require(`../../lib/connectionManager.js`)

module.exports = {
    handler: (socket, data) => {
        data = JSON.parse(data)

        if (!data?.connectionCode) return
        if (!connectionManager?.connections[data.connectionCode]) return
        if (connectionManager.connections[data.connectionCode].controlled == socket) return

        connectionManager.connections[data.connectionCode].controlled.emit(`receivedInput`, { data: data.data })
    }
}