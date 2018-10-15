process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL required but missing')
}
