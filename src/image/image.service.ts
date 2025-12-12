const { default: openai } = require('openai');
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
const fs = require('fs');


@Injectable()
export class ImageService {

  constructor(private readonly config: ConfigService) {}

  async chatGPTGenImage(prompt, model) {
    try {
        const chatGPTAI: any = new OpenAI({ apiKey: this.config.get<string>('API_KEY_CHATGPT') });
        const response = await chatGPTAI.images.generate({
            model: model,
            prompt: prompt,
            n: 1,
            size: '1024x1024',
        });
        //const imageUrl = 'https://madebyconor.com/assets/img/oprime.jpg';
        const imageUrl = response.data[0].url;
        if (!imageUrl) {
        throw new Error('No image URL returned from API');
        }

        const filePath = './imagescreated.txt';
        const generatedDate = new Date().toISOString()
        const line = `${prompt}\n${imageUrl}\n${generatedDate}\n`;
        fs.appendFile(filePath, line, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        });

        return { "response": imageUrl };

    } catch (error) {
        console.error('Image generation failed:', error.message);
        return null;
    }
}

}
