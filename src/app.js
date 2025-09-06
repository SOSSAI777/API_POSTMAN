const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const path = require('path');

require('module-alias/register');

// Imports corrigidos com alias "src"
const errorHandler = require('src/Infrastructure/Express/middlewares/errorHandler');
const authRoutes = require('src/Infrastructure/Express/routes/auth.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ADICIONE ESTA ROTA RAIZ AQUI (ANTES DAS OUTRAS ROTAS)
app.get('/', (req, res) => {
  res.json({ 
    message: '✅ API funcionando!', 
    status: 'OK',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/auth',
      docs: '/api-docs',
      health: '/health'
    }
  });
});

// ✅ ADICIONE TAMBÉM UMA ROTA HEALTH CHECK
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    server_time: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Rotas de autenticação
app.use('/auth', authRoutes);

// Swagger docs
try {
  // como o swagger.yml está na raiz do projeto
  const swaggerPath = path.join(process.cwd(), 'swagger.yml');
  const swaggerDocument = yaml.load(swaggerPath);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
  console.error('❌ Failed to load swagger.yml file:', e.message);
}

// Middleware de erros
app.use(errorHandler);

module.exports = app;