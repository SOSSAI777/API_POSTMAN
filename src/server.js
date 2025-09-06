// server.js - VERSÃO CORRIGIDA
const app = require('./app');
const config = require('./config/index');

const PORT = config.server.port || 3000;

async function startServer() {
  try {
    console.log('⚠️  Database disabled for testing');
    console.log('⚠️  Redis disabled for testing');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📌 Access API at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();