const connectionManager = require(`../../lib/connectionManager.js`)

module.exports = {
    handler: (socket, data) => {
        if (!data.key || !data.peerjscode) return

        let success = connectionManager.makeConnection(data.key, socket)
        // instead of connection status and domconnected, fire a confirmation event with files info to dom, if they confirm fire connectionstatus and domconnected
        socket.emit(`connectionStatus`, { success })
        
        if (!success) return
        connectionManager.connections[data.key].controlled.emit(`domConnected`, { key: data.key, peerjscode: data.peerjscode, success })
    }
}