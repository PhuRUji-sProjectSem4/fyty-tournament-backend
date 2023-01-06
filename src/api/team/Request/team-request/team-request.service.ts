import { BadRequestException, Injectable } from '@nestjs/common';
import { ReqStatus, Team, TeamRequest, User } from '@prisma/client';
import { AddTeamRequestDto } from 'src/dto/team.dto';
import { PrismaService } from 'src/prisma.service';
import { TeamMemberService } from '../../Member/team-member/team-member.service';


@Injectable()
export class TeamRequestService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly teamMemberService: TeamMemberService
        ){}

    async addTeamRequest(payload: AddTeamRequestDto): Promise<TeamRequest>{
        try{
            return await this.prisma.teamRequest.create({
                data: payload
            })
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getTeamRequest(): Promise<TeamRequest[]>{
        try{
            return await this.prisma.teamRequest.findMany();
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getTeamRequestById(teamRequestId: TeamRequest["id"]): Promise<TeamRequest>{
        try{
            return await this.prisma.teamRequest.findUniqueOrThrow({
                where:{
                    id: teamRequestId
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }
    
    async getRequestOfTeam(teamId: Team["id"]): Promise<TeamRequest[]>{
        try{
            return await this.prisma.teamRequest.findMany({
                where:{
                    teamId: teamId
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }
    
    async getMyTeamRequest(userId: User["id"]): Promise<TeamRequest[]>{
        try{
            return await this.prisma.teamRequest.findMany({
                where:{
                    userId: userId
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async declinedRequest(reqId: TeamRequest["id"]): Promise<TeamRequest>{
        try{
            return await this.prisma.teamRequest.update({
                where:{
                    id: reqId
                },
                data:{
                    status: ReqStatus.DECLINED
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }
    
    async acceptedRequest(reqId: TeamRequest["id"]): Promise<TeamRequest>{
        try{
            const acceptedRequest = await this.prisma.teamRequest.update({
                where:{
                    id: reqId
                },
                data:{
                    status: ReqStatus.ACCEPTED
                }
            });
            const addMember = await this.teamMemberService.addTeamMember(acceptedRequest.userId, acceptedRequest.teamId);

            return acceptedRequest
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }
}
