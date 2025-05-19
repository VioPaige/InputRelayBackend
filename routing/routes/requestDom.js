const connectionManager = require(`../../lib/connectionManager.js`)

module.exports = {
    handler: (socket, data) => {
        console.log(`requestDom ${data.key}`)

        // if (!data.key || !data.peerjscode) return
        if (!data.key) return // the !data.peerjscode check is required for inputrelay, but not for fileportal, need to pass the app name probably

        let success = connectionManager.makeConnection(data.key, socket)
        socket.emit(`connectionStatus`, { success })
        
        if (!success) return
        console.log(connectionManager.connections[data.key].controlled.id, data)
        console.log(`getinfo got for ${data.key}`)
        connectionManager.connections[data.key].controlled.emit(`domConnected`, {})
        connectionManager.connections[data.key].controlled.emit(`domConnected`, { key: data.key, peerjscode: data.peerjscode, success })
    }
}