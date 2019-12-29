const hapi = require ('@hapi/hapi')
const {validate} = require('./configs/validate')
const {routes} = require('./routes/Routes')
const Qs = require('qs')
const mongoose = require('mongoose');
mongoose.set('debug',true)

const init = async()=>{
    const server= hapi.server({
        port: 4000,
        host: '0.0.0.0', 
        query:{
                 parser:(query) => Qs.parse(query)
        }

    })
    try {
        await server.register(require('@hapi/basic'))
        await server.register({
            plugin: require('hapi-pino'),
            options: {
                prettyPrint: process.env.NODE_ENV !== 'production',
                stream: './log.log',
                redact: ['req.headers.authorization']
            }
        })

        server.auth.strategy('simple', 'basic', {validate})
        server.route(routes)

        server.start()
        console.log(`Server running at: ${server.info.uri}`)
        return server
    } catch (err) {
        server.log('err', 'An error occured');
        process.exit(1)
    }
}
init();