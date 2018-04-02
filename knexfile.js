module.exports = {
  
  test: {
    client: 'pg',
    connection: 'postgres://localhost/itemstest',
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds/test'
    },
    useNullAsDefault: true
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/items',
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds/dev'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './migrations'
    },
    useNullAsDefault: true
  }
}