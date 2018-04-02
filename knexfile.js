module.exports = {

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
  }
}