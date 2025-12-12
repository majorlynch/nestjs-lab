
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KeysModule } from './keys/keys.module';
import { ChatModule } from './chat/chat.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available app-wide
      envFilePath: '.env', // default is .env; adjust if needed
    }),
    KeysModule,
    ChatModule,
    ImageModule,
  ],
})
export class AppModule {}
