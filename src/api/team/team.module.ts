import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TeamMemberService } from './Member/team-member/team-member.service';
import { TeamRequestService } from './Request/team-request/team-request.service';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [],
  controllers: [TeamController],
  providers: [TeamService, PrismaService, TeamRequestService, TeamMemberService]
})
export class TeamModule { }
