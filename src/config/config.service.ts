import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  constructor() {
    const result = dotenv.config();

    if (result.error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = result.parsed;
    }
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public async getPortConfig() {
    return this.get('PORT');
  }

  public getDevMongoUri() {
    return (
      'mongodb://' + this.get('MONGO_HOST') + '/' + this.get('MONGO_DATABASE')
    );
  }

  public async getMongoConfig() {
    return {
      uri:
        this.get('NODE_ENV') === 'production'
          ? this.get('MONGO_CONNECTION_STRING')
          : this.getDevMongoUri(),
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
