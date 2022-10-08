import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('bye')
  getSmt():string {
    return this.appService.getBye();
  }

  @Post('createTeam')
  async createTeam(@Body() payload: Prisma.TeamCreateInput) {
    return this.appService.createTeam(payload);
  }
}
