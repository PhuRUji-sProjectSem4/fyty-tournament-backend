import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Game, Role, Team, TeamStaus } from '@prisma/client';
import { AddTeamDto, UpdateTeamDto } from 'src/dto/team.dto';
import { PrismaService } from 'src/prisma.service';
import { TeamMemberService } from './Member/team-member/team-member.service';

@Injectable()
export class TeamService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly teamMemberService: TeamMemberService
        ){}

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
            throw new BadRequestException(error.message);
        }
    }

    async getTeamByGameId(gameId: Game['id']): Promise<Team[]>{
        try{
            return await this.prisma.team.findMany({where:{gameId: gameId}});
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async addTeam(payload: AddTeamDto): Promise<Team>{
        try{
            const createTeam =  await this.prisma.team.create({data: payload});

            const addTeam = await this.prisma.teamMember.create({
                data:{
                    userId: createTeam.ownerId,
                    teamId: createTeam.id
                }
            })

            return createTeam
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async updateTeam(teamId: Team["id"], payload: UpdateTeamDto): Promise<Team>{
        try{
            return await this.prisma.team.update({
                where: {
                    id: teamId
                },
                data: payload
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async deleteTeam(teamId: Team["id"]): Promise<Team>{
        try{
            return await this.prisma.team.update({
                where:{
                    id: teamId
                }, 
                data:{
                    status: TeamStaus.DELETED
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async realDeleteTeam(teamId: Team["id"]): Promise<Team>{
        try{
            return await this.prisma.team.delete({
                where: {
                    id: teamId
                }
            })
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }
}
