import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common/decorators';
import { Game, Team, TeamMember, TeamRequest, Tournament, User } from '@prisma/client';
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
    @UseGuards(JwtAuthGuard)
    @Delete("/member/:id")
    async delMember(@Param("id") memberId: TeamMember["id"]): Promise<TeamMember>{
        return await this.teamRequestService.DeletedMember(memberId);
    }

    @UseGuards(JwtAuthGuard)
    @Put("/request/accAll")
    async accAll(){
        return await this.teamRequestService.acceptedAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get("request")
    async getTeamRequest(){
        return await this.teamRequestService.getTeamRequest();
    }

    @UseGuards(JwtAuthGuard)
    @Get("request/me")
    async getMyTeamRequest(@Subject() subject: User){
        return await this.teamRequestService.getMyTeamRequest(subject.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/request")
    async getRequestOfTeam(@Param("id") teamId: Team["id"]): Promise<TeamRequest[]>{
        return await this.teamRequestService.getRequestOfTeam(teamId);
    }

    @UseGuards(JwtAuthGuard)
    @Get("request/:id")
    async getTeamRequestById(@Param("id") requestId: TeamRequest["id"]){
        return await this.teamRequestService.getTeamRequestById(requestId);
    }
    
    @UseGuards(JwtAuthGuard)
    @Put("request/:id/declined")
    async declined(@Param("id") requestId: TeamRequest["id"]){
        return await this.teamRequestService.declinedRequest(requestId);
    }
    
    @UseGuards(JwtAuthGuard)
    @Put("request/:id/accepted")
    async accepted(@Param("id") requestId: TeamRequest["id"]){
        return await this.teamRequestService.acceptedRequest(requestId);
    }

    @UseGuards(JwtAuthGuard)
    @Post("request")
    async addTeamRequest(@Body() payload: AddTeamRequestDto): Promise<TeamRequest>{
        return await this.teamRequestService.addTeamRequest(payload); 
    }

    //TeamMember

    @UseGuards(JwtAuthGuard)
    @Get("member")
    async getAllTeamMember(): Promise<TeamMember[]>{
        return await this.teamMemberService.getAllTeamMember();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/member")
    async getTeamMember(@Param("id") teamId: Team["id"]): Promise<TeamMember[]>{
        return await this.teamMemberService.getTeamMember(teamId);
    }

    @UseGuards(JwtAuthGuard)
    @Put("member/:id/coach")
    async updateCoachRole(@Param("id") memberId: TeamMember["id"]):Promise<TeamMember>{
        return await this.teamMemberService.coachRole(memberId);
    }
    
    @UseGuards(JwtAuthGuard)
    @Put("member/:id/manager")
    async updateManagerRole(@Param("id") memberId: TeamMember["id"]):Promise<TeamMember>{
        return await this.teamMemberService.managerRole(memberId);
    }

    @UseGuards(JwtAuthGuard)
    @Put("member/:id/player")
    async updatePlayerRole(@Param("id") memberId: TeamMember["id"]):Promise<TeamMember>{
        return await this.teamMemberService.playerRole(memberId);
    }

    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllTeams(): Promise<Team[]>{
        return await this.teamService.getAllTeams();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/joined")
    async getJoinedTour(@Param("id") teamId: Team["id"]): Promise<Tournament[]>{
        return await this.teamService.joinedTournament(teamId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getTeam(@Param("id") teamId: Team["id"]): Promise<Team>{
        return await this.teamService.getTeam(teamId);
    }

    @UseGuards(JwtAuthGuard)
    @Get("game/:id")
    async getTeamByGameId(@Param("id") gameId: Game["id"]): Promise<Team[]>{
        return await this.teamService.getTeamByGameId(gameId);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async addTeam(@Body() payload: AddTeamDto): Promise<Team>{
        return await this.teamService.addTeam(payload);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async updateTeam(
        @Param("id") teamId: Team["id"],
        @Body() payload: UpdateTeamDto 
    ): Promise<Team>{
        return await this.teamService.updateTeam(teamId, payload)
    }
    
    @UseGuards(JwtAuthGuard)
    @Put("delete/:id")
    async deleteTeam(@Param("id") teamId: Team["id"]): Promise<Team>{
        return await this.teamService.deleteTeam(teamId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async realDelete(@Param("id") teamId: Team["id"]): Promise<Team>{
        return await this.teamService.realDeleteTeam(teamId);
    }
}
