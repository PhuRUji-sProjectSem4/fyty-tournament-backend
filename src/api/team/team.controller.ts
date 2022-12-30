import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common/decorators';
import { Game, Team } from '@prisma/client';
import { AddTeamDto, UpdateTeamDto } from 'src/dto/team.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    //@UseGuards(JwtAuthGuard)
    @Get()
    async getAllTeams(): Promise<Team[]>{
        return this.teamService.getAllTeams();
    }

    //@UseGuards(JwtAuthGuard)
    @Get(":id")
    async getTeam(@Param("id") teamId: Team["id"]): Promise<Team>{
        return this.teamService.getTeam(teamId);
    }

    @Get("/game/:id")
    async getTeamByGameId(@Param("id") gameId: Game["id"]): Promise<Team[]>{
        return this.teamService.getTeamByGameId(gameId);
    }
    
    //@UseGuards(JwtAuthGuard)
    @Post()
    async addTeam(@Body() payload: AddTeamDto): Promise<Team>{
        return this.teamService.addTeam(payload);
    }

    @Put(":id")
    async updateTeam(
        @Param("id") teamId: Team["id"],
        @Body() payload: UpdateTeamDto 
    ): Promise<Team>{
        return this.teamService.updateTeam(teamId, payload)
    }
    
    @Put("/delete/:id")
    async deleteTeam(@Param("id") teamId: Team["id"]): Promise<Team>{
        return this.teamService.deleteTeam(teamId);
    }

    @Delete(":id")
    async realDelete(@Param("id") teamId: Team["id"]): Promise<Team>{
        return this.teamService.realDeleteTeam(teamId);
    }
}
