require('dotenv').config()
const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
  connectionString,
  /*
    SSL is not supported in development
    */
  // ssl: { rejectUnauthorized: false },
})

module.exports = {
  connect: async () => await pool.connect(),
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
}
