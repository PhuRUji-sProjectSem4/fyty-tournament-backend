import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Team, TeamMember, User } from '@prisma/client';
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

    async addTeamMember(userId: User["id"], teamId: Team["id"]): Promise<TeamMember>{
        try{
            const addTeamMember = await this.prisma.teamMember.create({
                data: {
                    userId: userId,
                    teamId: teamId
                }
            });

            const getTeam = await this.prisma.team.findUniqueOrThrow({
                where:{
                    id: teamId
                }
            })

            const updateTeamCount = await this.prisma.team.update({
                where:{
                    id: teamId
                },
                data:{
                    currentMember: getTeam.currentMember + 1
                }
            })

            return addTeamMember
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }


}
