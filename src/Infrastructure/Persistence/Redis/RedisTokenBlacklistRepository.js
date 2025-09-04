const RedisClient = require('./RedisClient');

class RedisTokenBlacklistRepository {
    constructor() {
        this.client = RedisClient;
    }

    async add(token) {
        // Add token to blacklist with an expiration (e.g., 1 day)
        await this.client.set(token, 'blacklisted', 'EX', 86400);
    }

    async isBlacklisted(token) {
        const result = await this.client.get(token);
        return result === 'blacklisted';
    }
}

module.exports = RedisTokenBlacklistRepository;
