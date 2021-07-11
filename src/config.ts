import dotenv from 'dotenv'

dotenv.config()

const config = {
    server: {
        port: process.env.PORT || `4000`,
    },
    database: {
        dbUser: process.env.DB_USER,
        dbPass: process.env.DB_PASS,
        dbName: process.env.DB_NAME,
        dbHost: process.env.DB_HOST,
        dbPort: process.env.DB_PORT,
    }
}

export default config


