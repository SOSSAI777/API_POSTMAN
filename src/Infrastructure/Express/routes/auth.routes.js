const express = require('express');
const AuthController = require('src/Infrastructure/Express/controllers/AuthController');
const validationMiddleware = require('src/Infrastructure/Express/middlewares/validationMiddleware');
const { loginSchema, registerSchema } = require('src/Infrastructure/Express/validationSchemas');

const RegisterUser = require('src/Application/UseCases/Auth/RegisterUser');
const LoginUser = require('src/Application/UseCases/Auth/LoginUser');
const SequelizeUserRepository = require('src/Infrastructure/Persistence/Sequelize/SequelizeUserRepository');
const JWTProvider = require('src/Infrastructure/Providers/JWTProvider');

const userRepository = new SequelizeUserRepository();
const jwtProvider = new JWTProvider();
const registerUserUseCase = new RegisterUser(userRepository);
const loginUserUseCase = new LoginUser(userRepository, jwtProvider);
const authController = new AuthController(registerUserUseCase, loginUserUseCase);

const router = express.Router();

// Register route
router.post('/register', validationMiddleware(registerSchema), authController.register.bind(authController));

// Login route
router.post('/login', validationMiddleware(loginSchema), authController.login.bind(authController));

module.exports = router;
