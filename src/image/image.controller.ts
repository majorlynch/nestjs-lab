import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { ImageService } from './image.service';
import { InternalServerError } from 'openai';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('chatgptgenimage')
  async chatgptgenimage(@Body() body: any) {
    const { prompt, model } = body;
    try {
      return this.imageService.chatGPTGenImage(prompt, model);
    } catch {
      throw new InternalServerErrorException(
        'Something went in DeepSeekChat',
      );
    }
  }


}
