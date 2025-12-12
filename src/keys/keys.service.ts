import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()

export class KeysService {
  api_key_gemini: any;
  api_key_deepseek: any;
  api_key_mistral: any;
  api_key_chatgpt: any;

  constructor(private readonly config: ConfigService) {}

  getKeys() {
    // Read from environment variables via ConfigService
    return {
      API_KEY_GEMINI: this.config.get<string>('API_KEY_GEMINI'),
      API_KEY_DEEPSEEK: this.config.get<string>('API_KEY_DEEPSEEK'),
      API_KEY_MISTRAL: this.config.get<string>('API_KEY_MISTRAL'),
      API_KEY_CHATGPT: this.config.get<string>('API_KEY_CHATGPT'),
    };
  }
}
