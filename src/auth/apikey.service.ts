import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyService {
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get('API_KEY');
  }

  isKeyValid(key: string): boolean {
    return key === this.apiKey;
  }
}
