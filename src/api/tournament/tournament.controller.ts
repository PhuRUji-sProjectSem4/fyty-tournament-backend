import { Controller, Get, Post, Put } from '@nestjs/common';
import { Body, Delete, Param, UseGuards} from '@nestjs/common/decorators';
import { Match, MatchDetail, MatchResult, Tournament, TournamentJoined, User } from '@prisma/client';
import { Subject } from 'src/common/subject.decorator';
import { UpdateTeamDto } from 'src/dto/team.dto';
import { AddTournamentDto, AddTournamentJoinDto, CreateMatchDto, CreateMatchResultDto, DateMatchDto, DetailImgUrl } from 'src/dto/tournament.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { JoinedService } from './detail/joined/joined.service';
import { MatchService } from './match/match/match.service';
import { TournamentService } from './tournament.service';

@Controller('tournament')
export class TournamentController {
    constructor(
        private readonly tournamentService: TournamentService,
        private readonly joinedService: JoinedService,
        private readonly matchService: MatchService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get("match/:id/detail")
    async getMatchDetail(@Param("id") matchId: Match["id"]): Promise<MatchDetail[]>{
        return await this.matchService.getMatchDetail(matchId);
    }

    @UseGuards(JwtAuthGuard)
    @Put("match/detail/:id")
    async uploadImg(
        @Param("id") detailId: MatchDetail["id"],
        @Body() imgUrl: DetailImgUrl
    ): Promise<MatchDetail>{
        return await this.matchService.upload(detailId, imgUrl);
    }    

    @UseGuards(JwtAuthGuard)
    @Get("match/detail")
    async getAllDetail(): Promise<MatchDetail[]>{
        return await this.matchService.getAllDetail();
    }

    @UseGuards(JwtAuthGuard)
    @Post("/match/result")
    async score(@Body() payload: CreateMatchResultDto): Promise<MatchResult>{
        return await this.matchService.scoreMatch(payload);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/match/result")
    async getAllResult(): Promise<MatchResult[]>{
        return await this.matchService.getAllMatchResult();
    }

    @UseGuards(JwtAuthGuard)
    @Get("/match/result/:id")
    async getResult(@Param("id") resultId: MatchResult["id"]): Promise<MatchResult>{
        return await this.matchService.getTourMatchResultEach(resultId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/match/result")
    async getTourResult(@Param("id") tourId: Tournament["id"]): Promise<MatchResult[]>{
        return await this.matchService.getTourMatchResult(tourId);
    }

    @UseGuards(JwtAuthGuard)
    @Post(":id/init/match")
    async initTourMatch(
        @Param("id") tourId: Tournament["id"],
        @Body() date: DateMatchDto
    ): Promise<any>{
        return await this.matchService.initMatch(tourId, date);
    }

    @UseGuards(JwtAuthGuard)
    @Post("match")
    async createMatch(
        @Body() payload: CreateMatchDto
    ): Promise<any>{
        return await this.matchService.createMatch(payload);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/match")
    async getAllMatch():Promise<Match[]>{
        return await this.matchService.getAllMatch();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/match")
    async getTourMatch(@Param("id") tourId: Tournament["id"]): Promise<any[]>{
        return await this.matchService.getTourMatch(tourId);
    }

    @UseGuards(JwtAuthGuard)
    @Get("match/:id")
    async getMatchEach(@Param("id") matchId: Match["id"]): Promise<Match>{
        return await this.matchService.getMatchEach(matchId);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/join")
    async joinTournament(
        @Subject() user: User,
        @Body() payload: AddTournamentJoinDto
    ): Promise<TournamentJoined>{
        return await this.joinedService.joinTournament(user.id, payload);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/join")
    async  getAllTournamentJoin():Promise<TournamentJoined[]>{
        return await this.joinedService.getAllTournamentJoin();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(":id/join")
    async  getTournamentJoin(@Param("id") tourId: TournamentJoined["teamId"]):Promise<TournamentJoined[]>{
        return await this.joinedService.getTournamentJoin(tourId);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get("join/:id")
    async  getTournamentJoinEach(@Param("id") joinId: TournamentJoined["id"]):Promise<TournamentJoined>{
        return await this.joinedService.getTournamentJoinEach(joinId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTour(@Body() payload: AddTournamentDto): Promise<Tournament>{
        return await this.tournamentService.createTour(payload);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id/status/register")
    async regTour(
        @Param("id") tourId: Tournament["id"]
    ){
        return this.tournamentService.registerTour(tourId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id/status/start")
    async startTour(
        @Param("id") tourId: Tournament["id"]
    ){
        return this.tournamentService.startTour(tourId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id/status/end")
    async endTour(
        @Param("id") tourId: Tournament["id"]
    ){
        return this.tournamentService.endTour(tourId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllTour(): Promise<Tournament[]>{
        return await this.tournamentService.getAllTour();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getTourById(@Param("id") tourId: Tournament["id"]): Promise<Tournament>{
        return await this.tournamentService.getTourById(tourId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteTour(@Param("id") tourId: Tournament["id"]): Promise<Tournament>{
        return await this.tournamentService.deleteTour(tourId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id/detail")
    async updateTour(
        @Param("id") tourId: Tournament["id"],
        @Body() payload: UpdateTeamDto
    ){
        return await this.tournamentService.updateTour(tourId, payload);
    }
}
