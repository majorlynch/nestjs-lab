import { Mistral } from '@mistralai/mistralai';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
const { GoogleGenAI } = require('@google/genai');
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ChatService {
  chatGPTApiUrl = 'https://api.openai.com/v1/chat/completions';
  ai: any;
  response: any;
  mistralClient: any;
  deepseekAI: any;
  chatGPTKey: any;

  constructor(private readonly config: ConfigService) {
    this.chatGPTKey = this.config.get<string>('API_KEY_CHATGPT');
    this.ai = new GoogleGenAI({
      apiKey: this.config.get<string>('API_KEY_GEMINI'),
    });
    this.mistralClient = new Mistral({ apiKey: this.config.get<string>('API_KEY_MISTRAL')});

  }

  async geminiChat(chatPrompt, userHistory, aiHistory) {
    try {
      if (!this.ai) {
        console.log('Gemini ai not set');
        return '';
      }
      const chat = this.ai.chats.create({
        model: 'gemini-2.0-flash',
        history: [
          {
            role: 'user',
            parts: userHistory,
          },
          {
            role: 'model',
            parts: aiHistory,
          },
        ],
      });
      console.log('gemini call chatPrompt');
      this.response = await chat.sendMessage({
        message: chatPrompt,
      });

      return { response: this.response.text };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async mistralChat(messages) {
    console.log(messages);
    if (!this.mistralClient) {
      throw {
        status: 500,
        message: 'Mistral ai not set',
      };
    }

    let response = '';
    console.log('Before Mistral AI call');
    const result = await this.mistralClient.chat.stream({
      model: 'mistral-large-latest',
      messages,
    });

    for await (const chunk of result) {
      let streamText = chunk.data.choices[0].delta.content;
      if (typeof streamText === 'string') {
        response += streamText;
      }
    }
    return { response: response };
  }

  async deepseekChat(messages) {
    console.log('deepseekchat service');
    try {
      const response = await this.deepseekAI.chat.completions.create({
        model: 'deepseek-chat', // or 'deepseek-reasoner' for complex tasks
        messages,
        temperature: 0.7,
        max_tokens: 150,
      });

      return { response: response.choices[0].message.content };
    } catch (err) {
      if (err.message) {
        throw new InternalServerErrorException(err.response?.data?.error?.message || 'Deepseeek error');
      }
      throw new InternalServerErrorException(err);
    }
  }

  async chatGPTChat(messages) {
    console.log('chatgptchat service ' + this.chatGPTKey);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.chatGPTKey}`,
    };

    const body = {
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
    };

    try {
      console.log('chatgptchat request');
      const response = await axios.post(this.chatGPTApiUrl, body, { headers });
      console.log(response);
      return { response: response.data.choices[0].message.content };
    } catch (err) {
      if (err.response) {
        throw new InternalServerErrorException(err.response?.data?.error?.message || 'ChatGPT error');
      }
      throw new InternalServerErrorException(err);
    }
  }
}
