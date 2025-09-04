const AuthOutput = require('src/Application/DTOs/UserOutput');
const InvalidCredentialsException = require('src/Domain/Exceptions/InvalidCredentialsException');
const bcrypt = require('bcrypt');

class LoginUser {
  constructor(userRepository, jwtProvider) { 
    this.userRepository = userRepository;
    this.jwtProvider = jwtProvider;
  }

  async execute(input) {
    const { email, password } = input;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException('Invalid email or password.');
    }

  const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException('Invalid email or password.');
    }

  const token = this.jwtProvider.generateToken({ userId: user.id, email: user.email });

    return new AuthOutput(token, {
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}

module.exports = LoginUser;