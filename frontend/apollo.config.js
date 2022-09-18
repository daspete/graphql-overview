import { HttpLink } from 'apollo-link-http'
import ws from 'isomorphic-ws'
import { createClient } from 'graphql-ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionQueryResultData from './graphql/schema.json'

export default ({ $config, store }) => {
    const httpLink = new HttpLink({
        uri: $config.GRAPH_URL
    })

    const wsLink = new GraphQLWsLink(
        createClient({
            url: $config.GRAPH_WS_URL,
            webSocketImpl: ws,
            connectionParams: {
                reconnect: true,
                token: store.getters['auth/Token']
            }
        })
    )

    const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData
    })

    const cache = new InMemoryCache({
        // addTypename: false,
        fragmentMatcher
    })

    const link = split(
        ({ query }) => {
            const definition = getMainDefinition(query)
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        }, 
        wsLink, 
        httpLink
    )

    return {
        defaultHttpLink: false,
        link: typeof window == 'undefined' ? httpLink : link,
        cache,
        tokenName: 'herowar'
    }
}