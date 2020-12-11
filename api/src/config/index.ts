const {
  PORT,
  JWT_SECRET,
  EXPIRES_IN,
  DATABASE_URL
} = process.env
export default {
  port: PORT || 8000,
  jwt: {
    jwtSecret: JWT_SECRET,
    expiresIn: EXPIRES_IN
  },
  postgresPoolConfig: {
    connectionString: DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 60000,
    connectionTimeoutMillis: 60000,
    statement_timeout: 60000
  }
}
