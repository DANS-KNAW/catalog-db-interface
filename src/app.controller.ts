import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Annotation } from './entities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getAnnotation(@Body() createAnnotation: Annotation) {
    return this.appService.insertAnnotation(createAnnotation);
  }
}
