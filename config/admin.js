module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'b2336dc7e5ecc1c41324f41bb0cfa3f6'),
  },
});
