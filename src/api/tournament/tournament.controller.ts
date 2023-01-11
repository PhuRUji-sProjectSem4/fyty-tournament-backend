import { Controller, Get, Post, Put } from '@nestjs/common';
import { Body, Delete, Param} from '@nestjs/common/decorators';
import { Tournament, TournamentJoined } from '@prisma/client';
import { UpdateTeamDto } from 'src/dto/team.dto';
import { AddTournamentDto, AddTournamentJoinDto } from 'src/dto/tournament.dto';
import { JoinedService } from './detail/joined/joined.service';
import { TournamentService } from './tournament.service';

@Controller('tournament')
export class TournamentController {
    constructor(
        private readonly tournamentService: TournamentService,
        private readonly joinedService: JoinedService
    ){}

    @Post("/join")
    async joinTournament(@Body() payload: AddTournamentJoinDto): Promise<TournamentJoined>{
        return await this.joinedService.joinTournament(payload);
    }

    @Get("/join")
    async  getAllTournamentJoin():Promise<TournamentJoined[]>{
        return await this.joinedService.getAllTournamentJoin();
    }
    
    @Get(":id/join")
    async  getTournamentJoin(@Param("id") tourId: TournamentJoined["teamId"]):Promise<TournamentJoined[]>{
        return await this.joinedService.getTournamentJoin(tourId);
    }
    
    @Get("join/:id")
    async  getTournamentJoinEach(@Param("id") joinId: TournamentJoined["id"]):Promise<TournamentJoined>{
        return await this.joinedService.getTournamentJoinEach(joinId);
    }

    @Post()
    async createTour(@Body() payload: AddTournamentDto): Promise<Tournament>{
        return await this.tournamentService.createTour(payload);
    }

    @Put(":id/status/register")
    async regTour(
        @Param("id") tourId: Tournament["id"]
    ){
        return this.tournamentService.registerTour(tourId);
    }

    @Put(":id/status/start")
    async startTour(
        @Param("id") tourId: Tournament["id"]
    ){
        return this.tournamentService.startTour(tourId);
    }

    @Put(":id/status/end")
    async endTour(
        @Param("id") tourId: Tournament["id"]
    ){
        return this.tournamentService.endTour(tourId);
    }

    @Get()
    async getAllTour(): Promise<Tournament[]>{
        return await this.tournamentService.getAllTour();
    }

    @Get(":id")
    async getTourById(@Param("id") tourId: Tournament["id"]): Promise<Tournament>{
        return await this.tournamentService.getTourById(tourId);
    }

    @Delete(":id")
    async deleteTour(@Param("id") tourId: Tournament["id"]): Promise<Tournament>{
        return await this.tournamentService.deleteTour(tourId);
    }

    @Put(":id/detail")
    async updateTour(
        @Param("id") tourId: Tournament["id"],
        @Body() payload: UpdateTeamDto
    ){
        return await this.tournamentService.updateTour(tourId, payload);
    }
}
