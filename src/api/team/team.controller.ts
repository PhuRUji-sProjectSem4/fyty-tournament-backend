import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common/decorators';
import { Game, Team, TeamMember, TeamRequest, User } from '@prisma/client';
import { Subject } from 'src/common/subject.decorator';
import { AddTeamDto, AddTeamMemberDto, AddTeamRequestDto, UpdateTeamDto } from 'src/dto/team.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { TeamMemberService } from './Member/team-member/team-member.service';
import { TeamRequestService } from './Request/team-request/team-request.service';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
    constructor(
        private readonly teamService: TeamService, 
        private readonly teamRequestService: TeamRequestService,
        private readonly teamMemberService: TeamMemberService,
        ) {}

    // TeamRequest
    @Get("request")
    async getTeamRequest(){
        return await this.teamRequestService.getTeamRequest();
    }

    @UseGuards(JwtAuthGuard)
    @Get("request/me")
    async getMyTeamRequest(@Subject() subject: User){
        return await this.teamRequestService.getMyTeamRequest(subject.id);
    }

    @Get(":id/request")
    async getRequestOfTeam(@Param("id") teamId: Team["id"]): Promise<TeamRequest[]>{
        return await this.teamRequestService.getRequestOfTeam(teamId);
    }

    @Get("request/:id")
    async getTeamRequestById(@Param("id") requestId: TeamRequest["id"]){
        return await this.teamRequestService.getTeamRequestById(requestId);
    }
    
    @Put("request/:id/declined")
    async declined(@Param("id") requestId: TeamRequest["id"]){
        return await this.teamRequestService.declinedRequest(requestId);
    }
    
    @Put("request/:id/accepted")
    async accepted(@Param("id") requestId: TeamRequest["id"]){
        return await this.teamRequestService.acceptedRequest(requestId);
    }

    @Post("request")
    async addTeamRequest(@Body() payload: AddTeamRequestDto): Promise<TeamRequest>{
        return await this.teamRequestService.addTeamRequest(payload); 
    }

    //TeamMember

    @Get("member")
    async getAllTeamMember(): Promise<TeamMember[]>{
        return await this.teamMemberService.getAllTeamMember();
    }

    @Get(":id/member")
    async getTeamMember(@Param("id") teamId: Team["id"]): Promise<TeamMember[]>{
        return await this.teamMemberService.getTeamMember(teamId);
    }

    @Put("member/:id/coach")
    async updateCoachRole(@Param("id") memberId: TeamMember["id"]):Promise<TeamMember>{
        return await this.teamMemberService.coachRole(memberId);
    }
    
    @Put("member/:id/manager")
    async updateManagerRole(@Param("id") memberId: TeamMember["id"]):Promise<TeamMember>{
        return await this.teamMemberService.managerRole(memberId);
    }

    @Put("member/:id/player")
    async updatePlayerRole(@Param("id") memberId: TeamMember["id"]):Promise<TeamMember>{
        return await this.teamMemberService.playerRole(memberId);
    }

    @Put("member/:id/kick")
    async kickMember(@Param("id") memberId: TeamMember["id"]):Promise<TeamMember>{
        return await this.teamMemberService.kickMember(memberId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id/member/leave")
    async leftTeam(
        @Param("id") teamId: TeamMember["teamId"],
        @Subject() subject: User
        ):Promise<TeamMember>{
        return await this.teamMemberService.leftTeam(teamId, subject.id);
    }
    
    //Team
    //@UseGuards(JwtAuthGuard)
    @Get()
    async getAllTeams(): Promise<Team[]>{
        return await this.teamService.getAllTeams();
    }

    //@UseGuards(JwtAuthGuard)
    @Get(":id")
    async getTeam(@Param("id") teamId: Team["id"]): Promise<Team>{
        return await this.teamService.getTeam(teamId);
    }

    @Get("/game/:id")
    async getTeamByGameId(@Param("id") gameId: Game["id"]): Promise<Team[]>{
        return await this.teamService.getTeamByGameId(gameId);
    }
    
    //@UseGuards(JwtAuthGuard)
    @Post()
    async addTeam(@Body() payload: AddTeamDto): Promise<Team>{
        return await this.teamService.addTeam(payload);
    }

    @Put(":id")
    async updateTeam(
        @Param("id") teamId: Team["id"],
        @Body() payload: UpdateTeamDto 
    ): Promise<Team>{
        return await this.teamService.updateTeam(teamId, payload)
    }
    
    @Put("/delete/:id")
    async deleteTeam(@Param("id") teamId: Team["id"]): Promise<Team>{
        return await this.teamService.deleteTeam(teamId);
    }

    @Delete(":id")
    async realDelete(@Param("id") teamId: Team["id"]): Promise<Team>{
        return await this.teamService.realDeleteTeam(teamId);
    }
}
