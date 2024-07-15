const fs = require(`fs`)
const { Socket } = require(`socket.io`)

/**
 * @param {Socket} io 
 */
module.exports = (socket) => {
    fs.readdirSync(`./routing/routes`).forEach((file) => {
        if (!file.endsWith(`.js`)) return

        let route = require(`./routes/${file}`)
        if (!route.handler) return

        socket.on(file.replace(`.js`, ``), (data) => route.handler(socket, data))
    })
}