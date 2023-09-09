import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor() {
    const envFile = fs.readFileSync('.env');
    this.envConfig = dotenv.parse(envFile);
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
