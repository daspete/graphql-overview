import { config as dotenvConfig } from 'dotenv'
import { MongoClientOptions } from 'mongodb'
dotenvConfig()

export interface ApplicationConfig {
    server: {
        url: string
        port: number
        graphqlPath: string
        subscriptionsPath: string
    },
    auth: {
        jwt: {
            secret: string
            expiresIn: string
        }
    },
    database: {
        protocol?: string
        host?: string
        port?: number
        database?: string
        username?: string
        password?: string
        mongoClientOptions?: MongoClientOptions
    }
}

export const applicationConfig:ApplicationConfig = {
    server: {
        url: process.env.URL || 'localhost',
        port: parseInt(process.env.PORT, 10)  || 4000,
        graphqlPath: process.env.GRAPHQL_PATH || '/graphql',
        subscriptionsPath: process.env.SUBSCRIPTIONS_PATH || '/subscriptions'
    },
    auth: {
        jwt: {
            secret: process.env.JWT_SECRET || 'secret',
            expiresIn: process.env.JWT_EXPIRES_IN || '3d'
        }
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        protocol: process.env.DB_PROTOCOL || 'mongodb',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : null,
        database: process.env.DB_DATABASE || 'redberry',
        username: process.env.DB_USERNAME || null,
        password: process.env.DB_PASSWORD || null,
        mongoClientOptions: {},
    }
}