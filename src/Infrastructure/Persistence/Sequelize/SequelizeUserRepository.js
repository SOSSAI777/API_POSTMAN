const { User: UserModel } = require('./models');
const IUserRepository = require('../../../Domain/Repositories/IUserRepository');
const User = require('../../../Domain/User/User');
const Email = require('../../../Domain/User/ValueObjects/Email');
const Name = require('../../../Domain/User/ValueObjects/Name');
const Password = require('../../../Domain/User/ValueObjects/Password');
const UserAlreadyExistsException = require('../../../Domain/Exceptions/UserAlreadyExistsException');
const InvalidCredentialsException = require('../../../Domain/Exceptions/InvalidCredentialsException');

class SequelizeUserRepository extends IUserRepository {
  async findByEmail(email) {
    const emailValue = typeof email === 'string' ? email : email?.value;
    const userRecord = await UserModel.findOne({ where: { email: emailValue } });
    if (!userRecord) return null;
    // Return a lightweight plain object; caller can decide how to map
    return {
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      password: userRecord.password,
    };
  }

  async save(user) {
    const existing = await UserModel.findOne({ where: { email: user.email.value } });
    if (existing) throw new UserAlreadyExistsException();
    await UserModel.create({
      name: user.name.value,
      email: user.email.value,
      // Persist hashed password from value object
      password: user.password.hashedPassword,
    });
  }

  async validateCredentials(email, password) {
    const emailValue = typeof email === 'string' ? email : email?.value;
    const userRecord = await UserModel.findOne({ where: { email: emailValue } });
    if (!userRecord || userRecord.password !== password.value) {
      throw new InvalidCredentialsException();
    }
    return {
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      password: userRecord.password,
    };
  }
}

module.exports = SequelizeUserRepository;
