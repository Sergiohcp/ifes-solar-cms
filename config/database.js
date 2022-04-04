module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'ifes-solar-cms'),
      user: env('DATABASE_USERNAME', 'ifes-solar'),
      password: env('DATABASE_PASSWORD', 'ifes'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
