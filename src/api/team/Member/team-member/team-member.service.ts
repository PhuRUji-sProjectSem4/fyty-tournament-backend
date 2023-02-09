import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Role, Team, TeamMember, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { TeamService } from '../../team.service';

@Injectable()
export class TeamMemberService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async getAllTeamMember(): Promise<TeamMember[]>{
        try{
            return await this.prisma.teamMember.findMany();
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getTeamMember(teamId: Team["id"]): Promise<any[]>{
        try{
            const teamMember =  await this.prisma.teamMember.findMany({
                where:{
                    teamId: teamId,
                    OR: [
                        {
                            role: Role.PLAYER
                        },
                        {
                            role: Role.COACH
                        },
                        {
                            role: Role.MANAGER
                        }
                    ]
                    
                }
            });

            let members = []

            for(let mem=0; mem<teamMember.length; mem++){
                const {password, ...userData} = await this.prisma.user.findUniqueOrThrow({
                    where:{
                        id: teamMember[mem].userId
                    }
                });

                members.push({ ...teamMember[0], userData});
            };

            return members
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

            const updateTeamCount = await this.prisma.team.update({
                where:{
                    id: teamId
                },
                data:{
                    currentMember: {
                        increment: 1
                    }
                }
            })

            return addTeamMember
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async coachRole(memberId: TeamMember["id"]):Promise<TeamMember>{
        try{
            return await this.prisma.teamMember.update({
                where:{
                    id: memberId
                },
                data:{
                    role: Role.COACH
                }
            })
        }
        catch(error){
            throw new BadRequestException(error.message)
        }
    }
    
    async managerRole(memberId: TeamMember["id"]):Promise<TeamMember>{
        try{
            return await this.prisma.teamMember.update({
                where:{
                    id: memberId
                },
                data:{
                    role: Role.MANAGER
                }
            })
        }
        catch(error){
            throw new BadRequestException(error.message)
        }
    }
    
    async playerRole(memberId: TeamMember["id"]):Promise<TeamMember>{
        try{
            return await this.prisma.teamMember.update({
                where:{
                    id: memberId
                },
                data:{
                    role: Role.PLAYER
                }
            })
        }
        catch(error){
            throw new BadRequestException(error.message)
        }
    }

    async leftTeam(TeamId: TeamMember["teamId"], UserId: TeamMember["userId"]): Promise<TeamMember>{
        try{
            const member = await this.prisma.teamMember.findUniqueOrThrow({
                where:{
                    memberInTeam:{
                        teamId: TeamId,
                        userId: UserId
                    }
                }
            })
            
            if(member.role === Role.KICKED || member.role === Role.LEFT){
                return
            }

            const leftTeam =  await this.prisma.teamMember.update({
                where:{
                    memberInTeam:{
                        teamId: TeamId,
                        userId: UserId
                    },
                },
                data:{
                    role: Role.LEFT
                }
            });

            const updateTeam = await this.prisma.team.update({
                where:{
                    id: TeamId
                },
                data:{
                    currentMember: {
                        decrement: 1
                    }
                }
            });

            return leftTeam
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async kickMember(memberId: TeamMember["id"]): Promise<TeamMember>{
        try{
            const kickedMember =  await this.prisma.teamMember.update({
                where:{
                    id: memberId
                },
                data:{
                    role: Role.KICKED
                }
            });
            
            const updateTeam = await this.prisma.team.update({
                where:{
                    id: kickedMember.teamId
                },
                data:{
                    currentMember: {
                        decrement: 1
                    }
                }
            });

            return kickedMember
        }
        catch(error){
            throw new BadRequestException(error.message);    
        }
    }

}
