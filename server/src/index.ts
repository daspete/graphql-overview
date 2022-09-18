import { createServer } from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { createApplication } from 'graphql-modules'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

import { applicationConfig } from './config'

import { HelloModule } from './modules/Hello'

const application = createApplication({
    modules: [
        HelloModule
    ],
})

const schema = application.schema
const subscribe = application.createSubscription()
const executor = application.createApolloExecutor()

const app = express()
const httpServer = createServer(app)

const wsServer: WebSocketServer = new WebSocketServer({ server: httpServer, path: applicationConfig.server.subscriptionsPath })
const serverCleanup = useServer({ schema, subscribe }, wsServer)

const server = new ApolloServer({
    schema,
    executor,    
    async context(context) {
        return {
            ...context,
        }
    },
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        { async serverWillStart(){ return { async drainServer(){ await serverCleanup.dispose() } } } }
    ]
})

const start = async () => {
    await server.start()

    server.applyMiddleware({ app, path: applicationConfig.server.graphqlPath })

    httpServer.listen(applicationConfig.server.port, () => {
        console.log(`🚀 GraphQL server ready at http://${ applicationConfig.server.url }${ server.graphqlPath }`)
        console.log(`🚀 Subscription server ready at ws://${ applicationConfig.server.url }${ wsServer.options.path }`)
    })
}

start()