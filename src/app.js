const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
require('module-alias/register');
const fs = require('fs');

const errorHandler = require('./Infrastructure/Express/middlewares/errorHandler');
const authRoutes = require('./Infrastructure/Express/routes/auth.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
// Body parsers to populate req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount auth routes (router is already configured inside the routes file)
app.use('/auth', authRoutes);

try {
  const swaggerDocument = yaml.load(fs.readFileSync(__dirname + '/docs/swagger.yml', 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
  console.error('Failed to load swagger.yml file:', e);
}

app.use(errorHandler);

module.exports = app;
