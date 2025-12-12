import { Controller, Get } from '@nestjs/common';
import { KeysService } from './keys.service';

@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @Get()
  getKeys() {
    // WARNING: Exposing secrets in plain text is unsafe for production
    return this.keysService.getKeys();
  }
}
