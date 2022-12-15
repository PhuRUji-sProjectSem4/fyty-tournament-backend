import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post, UseGuards } from '@nestjs/common/decorators';
import { Team } from '@prisma/client';
import { AddTeamDto } from 'src/dto/team.dto';
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
    
    //@UseGuards(JwtAuthGuard)
    @Post()
    async addTeam(@Body() payload: AddTeamDto): Promise<Team>{
        return this.teamService.addTeam(payload);
    }
}
