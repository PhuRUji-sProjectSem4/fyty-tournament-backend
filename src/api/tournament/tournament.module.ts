import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JoinedService } from './detail/joined/joined.service';
import { RankService } from './detail/rank/rank.service';
import { MatchService } from './match/match/match.service';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';

@Module({
  imports: [],
  controllers: [TournamentController],
  providers: [
    TournamentService, 
    PrismaService, 
    MatchService, 
    JoinedService, 
    RankService
  ]
})
export class TournamentModule { }
