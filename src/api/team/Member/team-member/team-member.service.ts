import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Team, TeamMember } from '@prisma/client';
import { AddTeamMemberDto } from 'src/dto/team.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeamMemberService {
    constructor(private readonly prisma: PrismaService){}

    async getAllTeamMember(): Promise<TeamMember[]>{
        try{
            return this.prisma.teamMember.findMany();
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getTeamMember(teamId: Team["id"]): Promise<TeamMember[]>{
        try{
            return this.prisma.teamMember.findMany({
                where:{
                    teamId: teamId
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async addTeamMember(payload: AddTeamMemberDto): Promise<TeamMember>{
        try{
            return this.prisma.teamMember.create({
                data: payload
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }


}
