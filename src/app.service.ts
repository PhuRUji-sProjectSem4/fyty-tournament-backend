import { Injectable } from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getBye(): string {
    return 'Khem';
  }

  async createTeam(payload: Prisma.TeamCreateInput): Promise<Team> {
    return await this.prisma.team.create({data:payload})
  }


}
