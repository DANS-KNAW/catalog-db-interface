import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  getAnnotation(@Body() createAnnotation: any): string {
    console.log(JSON.stringify(createAnnotation, null, 4));
    return "CALLED";
  }
}
