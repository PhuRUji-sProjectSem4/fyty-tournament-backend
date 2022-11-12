import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [],
  controllers: [TeamController],
  providers: [TeamService, PrismaService]
})
export class TeamModule { }
