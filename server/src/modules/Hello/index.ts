import { createModule, gql } from 'graphql-modules'

export const HelloModule = createModule({
    id: 'HelloModule',
    typeDefs: gql`
        type Query {
            hello: String
        }
    `,
    resolvers: {
        Query: {
            hello: () => 'Hello World!'
        }
    }
})