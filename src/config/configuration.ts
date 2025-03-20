export default () => ({
  jwtSecret: process.env.JWT_SECRET || 'SecretKey',
  expiresIn: process.env.JWT_EXPIRESIN || '1d',
});
