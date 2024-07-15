const connectionManager = require(`../../lib/connectionManager.js`)

module.exports = {
    handler: (socket, data) => {
        let success = connectionManager.makeConnection(data.key, socket)
        socket.emit(`connectionStatus`, { success })
        
        if (!success) return
        connectionManager.connections[data.key].controlled.emit(`domConnected`, { key: data.key, success })
    }
}