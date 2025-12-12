import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('geminichat')
  async geminiChat(@Body() chatPrompt: any, userHistory: any, aiHistory: any) {
    try {
      return this.chatService.geminiChat(chatPrompt, userHistory, aiHistory);
    } catch {
      throw new InternalServerErrorException(
        'Something went in GeminiChat',
      );
    }
  }

  @Post('deepseekchat')
  async deepseekchat(@Body() messages: any) {
  console.log('deepseekchat controller');
    try {
      return this.chatService.deepseekChat(messages);
    } catch {
      throw new InternalServerErrorException(
        'Something went in DeepSeekChat',
      );
    }
  }

    @Post('chatgptchat')
  async chatGPTChat(@Body() messages: any) {
  console.log('chatgptchat controller');
    try {
  console.log('1');
      return this.chatService.chatGPTChat(messages);
    } catch {
      throw new InternalServerErrorException(
        'Something went in DeepSeekChat',
      );
    }
  }

  @Post('mistralchat')
  async mistralchat(@Body() messages: any) {
    try {
      return this.chatService.mistralChat(messages);
    } catch {
      throw new InternalServerErrorException(
        'Something went in MistralChat',
      );
    }
  }

}
