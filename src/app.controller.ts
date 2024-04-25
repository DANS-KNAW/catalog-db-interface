import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Annotation } from './entities';
import { ApiKeyGuard } from './auth/apikey.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(ApiKeyGuard)
  @Post()
  getAnnotation(@Body() createAnnotation: Annotation) {
    console.log(JSON.stringify(createAnnotation, null, 2));
    return this.appService.insertAnnotation(createAnnotation);
  }
}
