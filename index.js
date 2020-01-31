const server = require('./api/server.js');

const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`\n=== listening on port ${PORT} in ${process.env.NODE_ENV}===\n`);
});
