import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Team } from '@prisma/client';
import { AddTeamDto } from 'src/dto/team.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeamService {
    constructor(private readonly prisma: PrismaService){}

    async getAllTeams(): Promise<Team[]>{
        try{
            return await this.prisma.team.findMany();
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getTeam(teamId: Team['id']): Promise<Team>{
        try{
            return await this.prisma.team.findUniqueOrThrow({where:{id: teamId}});
        }
        catch(error){
            throw new BadRequestException(error.massage);
        }
    }

    async addTeam(payload: AddTeamDto): Promise<Team>{
        try{
            return await this.prisma.team.create({data: payload});
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }
}
