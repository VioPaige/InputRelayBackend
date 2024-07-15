const adjectives = require(`../data/adjectives.json`)
const nouns = require(`../data/nouns.json`)

module.exports = new class ConnectionManager {
    constructor() {
        this.connections = {}

        setInterval(this.clearInfo, 900_000) // every 15 minutes
    }

    generateAccessKey = () => {
        return `${Math.ceil(Math.random() * 99)}-${adjectives[Math.floor(Math.random() * adjectives.length - .001)]}-${adjectives[Math.floor(Math.random() * adjectives.length - .001)]}-${nouns[Math.floor(Math.random() * nouns.length - .001)]}`
    }

    awaitConnection = (socket) => {
        let key = this.generateAccessKey()
        while (this.connections[key]) key = this.generateAccessKey()
        
        this.connections[key] = {
            controlled: socket,
            controller: null,
        }

        return key
    }

    makeConnection = (key, socket) => {
        if (!this.connections[key]) return false

        this.connections[key].controller = socket
        return true
    }

    sendData = (key, data) => {
        if (!this.connections[key]) return false

        this.connections[key].controlled.emit(data.action, data)
        return true
    }

    clearInfo = () => {
        for (let key in this.connections) {
            if (this.connections[key].controller.disconnected || this.connections[key].controlled.disconnected) {
                delete this.connections[key]
            }
        }
    }
}